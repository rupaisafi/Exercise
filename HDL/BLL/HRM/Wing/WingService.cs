using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;
using System.Data;
using DBManager;

namespace BLL.HRM.Wing
{
    public class WingService : IWingRepository
    {
        readonly WingDataService _dataService = new WingDataService();
        public string SaveWing(Common_Wing objWing)
        {
            return _dataService.SaveWing(objWing);
        }

        public GridEntity<Common_Wing> GetWingSummary(GridOptions options)
        {
            return _dataService.GetWingSummary(options);
        }

        public List<Common_Wing> GetAllWing()
        {
            return _dataService.GetWings();
        }

        public GridEntity<R_DeptSection> GetDeptSectionSummary(GridOptions options)
        {
            return _dataService.GetDeptSectionSummary(options);
        }

        public GridEntity<R_SecWing> GetWingPermissionSummary(GridOptions options, string DSecID)
        {
            return _dataService.GetWingPermissionSummary(options, DSecID);
        }

        public string SaveWingPermission(int DSecID, List<R_SecWing> objUnitDepWingList, List<R_SecWing> objRemovedWingList)
        {
            var UnitDepWing_dt = new DataTable();
            UnitDepWing_dt.Columns.Add("SWingID");
            UnitDepWing_dt.Columns.Add("DSecID");
            UnitDepWing_dt.Columns.Add("WingID");

            if (objUnitDepWingList != null)
                foreach (var objUnitDepWing in objUnitDepWingList)
                {
                    DataRow row1;
                    row1 = UnitDepWing_dt.NewRow();
                    row1["SWingID"] = objUnitDepWing.SWingID;
                    row1["DSecID"] = DSecID;
                    row1["WingID"] = objUnitDepWing.WingID;
                    UnitDepWing_dt.Rows.Add(row1);
                }
            UnitDepWing_dt.TableName = "tblWing";
            DataSet dsWing = new DataSet("dsWing");
            dsWing.Tables.Add(UnitDepWing_dt);

            //RemoveWing
            var removeSec_dt = new DataTable();
            removeSec_dt.Columns.Add("SWingID");
            removeSec_dt.Columns.Add("DSecID");
            removeSec_dt.Columns.Add("WingID");
            if (objRemovedWingList != null)
                foreach (var objRemoveWing in objRemovedWingList)
                {
                    DataRow row1;
                    row1 = removeSec_dt.NewRow();
                    row1["SWingID"] = objRemoveWing.SWingID;
                    row1["DSecID"] = DSecID;
                    row1["WingID"] = objRemoveWing.WingID;
                    removeSec_dt.Rows.Add(row1);
                }
            removeSec_dt.TableName = "tblRemoveWing";
            DataSet dsRemoveSec = new DataSet("dsRemoveWing");
            dsRemoveSec.Tables.Add(removeSec_dt);

            return _dataService.SaveWingPermission(dsWing, dsRemoveSec);
        }
    }
}
