import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome da subscription é obrigatório"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Preço da subscription é obrigatório"],
      min: [0, "Preço deve ser maior que 0"],
      max: [1000, "Preço deve ser menor que 1000"],
    },
    currency: {
      type: String,
      enum: ["USD", "R$", "GBP"],
      default: "R$",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enums: [
        "esportes",
        "entretenimento",
        "notícias",
        "estilo de vida",
        "tecnologia",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["ativo", "cancelado", "expirado"],
      default: "ativo",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "A data de inicio deve estar no passado.",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startdate;
        },
        message: "A data de renovação deve ser posterios a data de início.",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Calcular automaticamente data de renovação se estiver faltando.
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  //Atualizar automaticamente a data de renovação se a data ja estiver passado.
  if ((this.renewalDate = new Date(this.startDate))) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
