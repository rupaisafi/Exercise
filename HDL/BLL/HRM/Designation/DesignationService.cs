using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;
using DBManager;
using System.Data;

namespace BLL.HRM.Designation
{
    public class DesignationService : IDesignationRepository
    {
        readonly DesignationDataService _dataService = new DesignationDataService();

        public string SaveDesignation(Common_Designation objDesignation)
        {
            return _dataService.SaveDesignation(objDesignation);
        }

        public GridEntity<Common_Designation> GetDesignationSummary(GridOptions options)
        {
            return _dataService.GetDesignationSummary(options);
        }

        public List<Common_Designation> GetDesignations()
        {
            return _dataService.GetDesignations();
        }

        public List<Common_DesignationGroup> GetAllDesignationGroup()
        {
            return _dataService.GetAllDesignationGroup();
        }

        public GridEntity<R_DeptDesignation> GetDesignationPermissionSummary(GridOptions options, string UDepID)
        {
            return _dataService.GetDesignationPermissionSummary(options, UDepID);
        }

        public string SaveDesignationPermission(int UDepID, List<R_DeptDesignation> objDepDesignationList, List<R_DeptDesignation> objRemovedDesignationList)
        {
            var DepDesignation_dt = new DataTable();
            DepDesignation_dt.Columns.Add("DepDesignationID");
            DepDesignation_dt.Columns.Add("UDepID");
            DepDesignation_dt.Columns.Add("DesignationID");

            if (objDepDesignationList != null)
                foreach (var objUnitDepSection in objDepDesignationList)
                {
                    DataRow row1;
                    row1 = DepDesignation_dt.NewRow();
                    row1["DepDesignationID"] = objUnitDepSection.DepDesignationID;
                    row1["UDepID"] = UDepID;
                    row1["DesignationID"] = objUnitDepSection.DesignationID;
                    DepDesignation_dt.Rows.Add(row1);
                }
            DepDesignation_dt.TableName = "tblDesignation";
            DataSet dsSection = new DataSet("dsDesignation");
            dsSection.Tables.Add(DepDesignation_dt);

            //RemoveSec
            var removeSec_dt = new DataTable();
            removeSec_dt.Columns.Add("DepDesignationID");
            removeSec_dt.Columns.Add("UDepID");
            removeSec_dt.Columns.Add("DesignationID");
            if (objRemovedDesignationList != null)
                foreach (var objRemoveSection in objRemovedDesignationList)
                {
                    DataRow row1;
                    row1 = removeSec_dt.NewRow();
                    row1["DepDesignationID"] = objRemoveSection.DepDesignationID;
                    row1["UDepID"] = UDepID;
                    row1["DesignationID"] = objRemoveSection.DesignationID;
                    removeSec_dt.Rows.Add(row1);
                }
            removeSec_dt.TableName = "tblRemoveDesignation";
            DataSet dsRemoveSec = new DataSet("dsRemoveDesignation");
            dsRemoveSec.Tables.Add(removeSec_dt);

            return _dataService.SaveDesignationPermission(dsSection, dsRemoveSec);
        }
    }
}
