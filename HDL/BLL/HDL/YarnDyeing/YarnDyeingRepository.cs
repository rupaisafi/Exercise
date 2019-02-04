using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.YarnDyeing
{
    public class YarnDyeingRepository : IYarnDyeingRepository
    {
        private readonly static YarnDyeingDataService yarnDyeingDataService = new YarnDyeingDataService();

        public List<DyeingYarnDetail> GetDyeingYarnDetail(int idNo)
        {
            return yarnDyeingDataService.GetDyeingYarnDetail(idNo);
        }
        public GridEntity<DyeingYarn> GetDyeingYarnSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return yarnDyeingDataService.GetDyeingYarnSummary(options, dateFrom, dateTo);
        }
        public DyeingYarn SaveYarnDyeingInfo(DyeingYarn dyeingYarn, List<DyeingYarnDetail> dyeingYarnDetail)
        {
            DataSet dsYarnDye = new DataSet("dsYarnDye");
            if (dyeingYarn != null)
            {
                var yarnDyeDetail = new DataTable("tblYarnDyeDetail");
                yarnDyeDetail.Columns.Add("DIID");
                yarnDyeDetail.Columns.Add("DID");
                yarnDyeDetail.Columns.Add("SetNo");
                yarnDyeDetail.Columns.Add("PDate");
                yarnDyeDetail.Columns.Add("BeamNo");
                yarnDyeDetail.Columns.Add("YName");
                yarnDyeDetail.Columns.Add("YCode");
                yarnDyeDetail.Columns.Add("YCount");
                yarnDyeDetail.Columns.Add("BeamLength");
                yarnDyeDetail.Columns.Add("BeamWeight");
                yarnDyeDetail.Columns.Add("EndsBeam");
                yarnDyeDetail.Columns.Add("ProdCone");
                yarnDyeDetail.Columns.Add("ShiftName");
                yarnDyeDetail.Columns.Add("ShiftCode");
                yarnDyeDetail.Columns.Add("MPM");
                yarnDyeDetail.Columns.Add("Tension");
                yarnDyeDetail.Columns.Add("OPName");
                yarnDyeDetail.Columns.Add("OPCode");
                yarnDyeDetail.Columns.Add("PackingManName");
                yarnDyeDetail.Columns.Add("PackingManCode");
                yarnDyeDetail.Columns.Add("STime");
                yarnDyeDetail.Columns.Add("FTime");
                yarnDyeDetail.Columns.Add("TTime");
                yarnDyeDetail.Columns.Add("Breakge");
                yarnDyeDetail.Columns.Add("BreakgePoint");
                yarnDyeDetail.Columns.Add("LooseEnds");
                yarnDyeDetail.Columns.Add("Crossing");
                yarnDyeDetail.Columns.Add("Lapper");
                yarnDyeDetail.Columns.Add("Knotting");
                yarnDyeDetail.Columns.Add("Remarks");
                yarnDyeDetail.Columns.Add("EDate");
                yarnDyeDetail.Columns.Add("UserName");

                if (dyeingYarnDetail != null && dyeingYarnDetail.Count > 0)
                    foreach (var dyeYarnDetail in dyeingYarnDetail)
                    {
                        DataRow row;
                        row = yarnDyeDetail.NewRow();
                        row["DID"] = dyeYarnDetail.DID;
                        row["SetNo"] = dyeYarnDetail.SetNo;
                        row["PDate"] = DateTime.Now.ToString("dd-MM-yyyy");
                        row["BeamNo"] = dyeYarnDetail.BeamNo;
                        row["YName"] = dyeYarnDetail.YName;
                        row["YCode"] = dyeYarnDetail.YCode;
                        row["YCount"] = dyeYarnDetail.YCount;
                        row["BeamLength"] = dyeYarnDetail.BeamLength;
                        row["BeamWeight"] = dyeYarnDetail.BeamWeight;
                        row["EndsBeam"] = dyeYarnDetail.EndsBeam;
                        row["ProdCone"] = dyeYarnDetail.ProdCone;
                        row["ShiftName"] = dyeYarnDetail.ShiftName;
                        row["ShiftCode"] = dyeYarnDetail.ShiftCode;
                        row["MPM"] = dyeYarnDetail.MPM;
                        row["Tension"] = dyeYarnDetail.Tension;
                        row["OPName"] = dyeYarnDetail.OPName;
                        row["OPCode"] = dyeYarnDetail.OPCode;
                        row["PackingManName"] = dyeYarnDetail.PackingManName;
                        row["PackingManCode"] = dyeYarnDetail.PackingManCode;
                        row["STime"] = dyeYarnDetail.STime;
                        row["FTime"] = dyeYarnDetail.FTime;
                        row["TTime"] = dyeYarnDetail.TTime;
                        row["Breakge"] = dyeYarnDetail.Breakge;
                        row["BreakgePoint"] = dyeYarnDetail.BreakgePoint;
                        row["LooseEnds"] = dyeYarnDetail.LooseEnds;
                        row["Crossing"] = dyeYarnDetail.Crossing;
                        row["Lapper"] = dyeYarnDetail.Lapper;
                        row["Knotting"] = dyeYarnDetail.Knotting;
                        row["Remarks"] = dyeYarnDetail.Remarks;
                        row["EDate"] = DateTime.Now.ToString("dd-MM-yyyy");
                        row["UserName"] = dyeYarnDetail.UserName;
                        yarnDyeDetail.Rows.Add(row);
                    }
                dsYarnDye.Tables.Add(yarnDyeDetail);
            }

            return yarnDyeingDataService.SaveYarnDyeingInfo(dyeingYarn, dsYarnDye);
        }

    }
}
