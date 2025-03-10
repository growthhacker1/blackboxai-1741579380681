const mongoose = require('mongoose');
const DateUtil = require('../utils/dateUtil');

const manifestSchema = new mongoose.Schema({
  manifestNo: {
    type: String,
    required: true,
    unique: true
  },
  manifestMiti: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return DateUtil.validateNepaliDate(v);
      },
      message: props => `${props.value} is not a valid Nepali date!`
    }
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  unloadingPlace: String,
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ledger'
  },
  invoices: [{
    biltiNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Billing',
      required: true
    },
    packages: {
      type: Number,
      required: true
    },
    weight: Number,
    consignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ledger',
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    payMode: {
      type: String,
      enum: ['Due', 'To Pay', 'Paid'],
      required: true
    }
  }],
  totalPackages: {
    type: Number,
    required: true
  },
  totalWeight: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Created', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Created'
  },
  freightChallan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FreightChallan'
  },
  tracking: [{
    location: String,
    miti: {
      type: String,
      validate: {
        validator: function(v) {
          return DateUtil.validateNepaliDate(v);
        },
        message: props => `${props.value} is not a valid Nepali date!`
      }
    },
    status: String,
    remarks: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  deliveryDetails: {
    deliveredMiti: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || DateUtil.validateNepaliDate(v);
        },
        message: props => `${props.value} is not a valid Nepali date!`
      }
    },
    receivedBy: String,
    podImage: String,
    remarks: String
  },
  remarks: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
manifestSchema.index({ manifestNo: 1 });
manifestSchema.index({ manifestMiti: 1 });
manifestSchema.index({ branch: 1 });
manifestSchema.index({ truck: 1 });
manifestSchema.index({ driver: 1 });
manifestSchema.index({ status: 1 });
manifestSchema.index({ 'invoices.biltiNo': 1 });

// Pre-save middleware to calculate totals
manifestSchema.pre('save', function(next) {
  // Calculate total packages
  this.totalPackages = this.invoices.reduce((total, invoice) => {
    return total + invoice.packages;
  }, 0);

  // Calculate total weight
  this.totalWeight = this.invoices.reduce((total, invoice) => {
    return total + (invoice.weight || 0);
  }, 0);

  // Calculate total amount
  this.totalAmount = this.invoices.reduce((total, invoice) => {
    return total + invoice.amount;
  }, 0);

  next();
});

// Virtual for getting count of invoices
manifestSchema.virtual('invoiceCount').get(function() {
  return this.invoices.length;
});

const Manifest = mongoose.model('Manifest', manifestSchema);

module.exports = Manifest;
