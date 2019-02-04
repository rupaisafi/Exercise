using System;

namespace Entities.HDL
{
    public class DyeingConsumptionDetail
    {
        public int ID { get; set; }
        public int SetNo { get; set; }
        public DateTime ConsumptionDate { get; set; }
        public string ChemicalName { get; set; }
        public string ChemicalCode { get; set; }
        public string Unit { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Rate { get; set; }
        public decimal? DyeingQuantity { get; set; }
        public decimal? SizingQuantity { get; set; }
        public decimal? DyeingValue { get; set; }
        public decimal? SizingValue { get; set; }
        public decimal? TotalValue { get; set; }
        public string FactoryLot { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
        public string SaveStatus { get; set; }
    }
}
