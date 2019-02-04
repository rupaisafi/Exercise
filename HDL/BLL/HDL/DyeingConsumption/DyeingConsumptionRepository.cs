using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.DyeingConsumption
{
    public class DyeingConsumptionRepository : IDyeingConsumptionRepository
    {
        private readonly static DyeingConsumptionDataService dataService = new DyeingConsumptionDataService();

        public GridEntity<DyeingConsumptionDetail> GetDyeingConsumptionDetailsSummary(GridOptions options, string setNo) {
            return dataService.GetDyeingConsumptionDetailsSummary(options, setNo);
        }

        public GridEntity<DyeingConsumptionInfo> GetDyeingConsumptionSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return dataService.GetDyeingConsumptionSummary(options, dateFrom, dateTo);
        }

        public DyeingConsumptionInfo GetDyeingConsumptionInfo(string setNo)
        {
            return dataService.GetDyeingConsumptionInfo(setNo);
        }

        public DataTable SaveDyeingConsumption(string setNo, List<DyeingConsumptionDetail> consumptions)
        {
            var consumptionDetail = new DataTable("tblDyeingConsumptionDetail");
            consumptionDetail.Columns.Add("ID");
            consumptionDetail.Columns.Add("SETNO");
            consumptionDetail.Columns.Add("CONSUMPTIONDATE");
            consumptionDetail.Columns.Add("CHEMICALNAME");
            consumptionDetail.Columns.Add("CHEMICALCODE");
            consumptionDetail.Columns.Add("UNIT");
            consumptionDetail.Columns.Add("QUANTITY");
            consumptionDetail.Columns.Add("RATE");
            consumptionDetail.Columns.Add("DYEINGQUANTITY");
            consumptionDetail.Columns.Add("SIZINGQUANTITY");
            consumptionDetail.Columns.Add("DYEINGVALUE");
            consumptionDetail.Columns.Add("SIZINGVALUE");
            consumptionDetail.Columns.Add("TOTALVALUE");
            consumptionDetail.Columns.Add("FACTORYLOT");
            consumptionDetail.Columns.Add("USERID");
            consumptionDetail.Columns.Add("TERMID");

            if (consumptions != null && consumptions.Count > 0)
                foreach (var consumption in consumptions)
                {
                    DataRow row;
                    row = consumptionDetail.NewRow();
                    row["SETNO"] = consumption.SetNo;
                    row["CONSUMPTIONDATE"] = consumption.ConsumptionDate.ToString("dd-MMM-yyyy");
                    row["CHEMICALNAME"] = consumption.ChemicalName;
                    row["CHEMICALCODE"] = consumption.ChemicalCode;
                    row["UNIT"] = consumption.Unit;
                    row["QUANTITY"] = consumption.Quantity;
                    row["RATE"] = consumption.Rate;
                    row["DYEINGQUANTITY"] = consumption.DyeingQuantity;
                    row["SIZINGQUANTITY"] = consumption.SizingQuantity;
                    row["DYEINGVALUE"] = consumption.DyeingValue;
                    row["SIZINGVALUE"] = consumption.SizingValue;
                    row["TOTALVALUE"] = consumption.TotalValue;
                    row["FACTORYLOT"] = consumption.FactoryLot;
                    row["USERID"] = consumption.UserId;
                    row["TERMID"] = consumption.TermId;
                    consumptionDetail.Rows.Add(row);
                }
            DataSet dsDyeingConsumptionDetails = new DataSet("dsDyeingConsumptionDetails");
            dsDyeingConsumptionDetails.Tables.Add(consumptionDetail);
            return dataService.SaveDyeingConsumption(setNo, dsDyeingConsumptionDetails);
        }
    }
}
