using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;
using System.Data;
using DBManager;

namespace BLL.HRM.Section
{
    public class SectionService : ISectionRepository
    {
        readonly SectionDataService _dataService = new SectionDataService();

        public string SaveSection(Common_Section objSection)
        {
            return _dataService.SaveSection(objSection);
        }

        public GridEntity<Common_Section> GetSectionSummary(GridOptions options)
        {
            return _dataService.GetSectionSummary(options);
        }

        public List<Common_Section> GetAllSection()
        {
            return _dataService.GetSections();
        }

        public GridEntity<R_UnitDept> GetUnitDepartmentSummary(GridOptions options)
        {
            return _dataService.GetUnitDepartmentSummary(options);
        }

        public GridEntity<R_DeptSection> GetSectionPermissionSummary(GridOptions options, string UDepID)
        {
            return _dataService.GetSectionPermissionSummary(options, UDepID);
        }

        public string SaveSectionPermission(int UDepID, List<R_DeptSection> objUnitDepSectionList, List<R_DeptSection> objRemovedSectionList)
        {
            var UnitDepSection_dt = new DataTable();
            UnitDepSection_dt.Columns.Add("DSECID");
            UnitDepSection_dt.Columns.Add("UDEPID");
            UnitDepSection_dt.Columns.Add("SECTIONID");

            if (objUnitDepSectionList != null)
                foreach (var objUnitDepSection in objUnitDepSectionList)
                {
                    DataRow row1;
                    row1 = UnitDepSection_dt.NewRow();
                    row1["DSECID"] = objUnitDepSection.DSecID;
                    row1["UDEPID"] = UDepID;
                    row1["SECTIONID"] = objUnitDepSection.SectionID;
                    UnitDepSection_dt.Rows.Add(row1);
                }
            UnitDepSection_dt.TableName = "tblSection";
            DataSet dsSection = new DataSet("dsSection");
            dsSection.Tables.Add(UnitDepSection_dt);

            //RemoveSec
            var removeSec_dt = new DataTable();
            removeSec_dt.Columns.Add("DSECID");
            removeSec_dt.Columns.Add("UDEPID");
            removeSec_dt.Columns.Add("SECTIONID");
            if (objRemovedSectionList != null)
                foreach (var objRemoveSection in objRemovedSectionList)
                {
                    DataRow row1;
                    row1 = removeSec_dt.NewRow();
                    row1["DSECID"] = objRemoveSection.DSecID;
                    row1["UDEPID"] = UDepID;
                    row1["SECTIONID"] = objRemoveSection.SectionID;
                    removeSec_dt.Rows.Add(row1);
                }
            removeSec_dt.TableName = "tblRemoveSection";
            DataSet dsRemoveSec = new DataSet("dsRemoveSection");
            dsRemoveSec.Tables.Add(removeSec_dt);

            return _dataService.SaveSectionPermission(dsSection, dsRemoveSec);
        }
    }
}
