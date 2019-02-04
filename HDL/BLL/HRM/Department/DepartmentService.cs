using DAL.HRM;
using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HRM.Department
{
    public class DepartmentService : IDepartmentRepository
    {
        readonly DepartmentDataService _dataService = new DepartmentDataService();

        public string SaveDepartment(Common_Department objDepartment)
        {
            return _dataService.SaveDepartment(objDepartment);
        }

        public GridEntity<Common_Department> GetDepartmentSummary(GridOptions options)
        {
            return _dataService.GetDepartmentSummary(options);
        }

        public List<Common_Department> GetAllDepartment()
        {
            return _dataService.GetAllDepartment();
        }

        public GridEntity<R_UnitDept> GetDepartmentPermissionSummary(GridOptions options, string UnitId)
        {
            return _dataService.GetDepartmentPermissionSummary(options, UnitId);
        }

        public string SaveUnitDepartmentPermission(int UnitId, List<R_UnitDept> objUnitDepartmentList, List<R_UnitDept> objRemovedDepartmentList)
        {
            var UnitDept_dt = new DataTable();
            UnitDept_dt.Columns.Add("UDEPTID");
            UnitDept_dt.Columns.Add("UNITID");
            UnitDept_dt.Columns.Add("DEPARTMENTID");

            if (objUnitDepartmentList != null)
                foreach (var objUnitDepartment in objUnitDepartmentList)
                {
                    DataRow row1;
                    row1 = UnitDept_dt.NewRow();
                    row1["UDEPTID"] = objUnitDepartment.UDepID;
                    row1["UNITID"] = UnitId;
                    row1["DEPARTMENTID"] = objUnitDepartment.DepartmentID;
                    UnitDept_dt.Rows.Add(row1);
                }
            UnitDept_dt.TableName = "tblDepartment";
            DataSet dsMenu = new DataSet("dsDepartment");
            dsMenu.Tables.Add(UnitDept_dt);

            //RemoveDept
            var removeDept_dt = new DataTable();
            removeDept_dt.Columns.Add("UDEPTID");
            removeDept_dt.Columns.Add("UNITID");
            removeDept_dt.Columns.Add("DEPARTMENTID");
            if (objRemovedDepartmentList != null)
                foreach (var objRemoveDepartment in objRemovedDepartmentList)
                {
                    DataRow row1;
                    row1 = removeDept_dt.NewRow();
                    row1["UDEPTID"] = objRemoveDepartment.UDepID;
                    row1["UNITID"] = UnitId;
                    row1["DEPARTMENTID"] = objRemoveDepartment.DepartmentID;
                    removeDept_dt.Rows.Add(row1);
                }
            removeDept_dt.TableName = "tblRemoveDepartment";
            DataSet dsRemoveDept = new DataSet("dsRemoveDenu");
            dsRemoveDept.Tables.Add(removeDept_dt);

            return _dataService.SaveUnitDepartmentPermission(dsMenu, dsRemoveDept);
        }
    }
}
