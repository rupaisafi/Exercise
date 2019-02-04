using DAL.HRM;
using DBManager;
using Entities.HRM;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AUtilities;

namespace BLL.HRM.EmployeeBasic
{
    public class EmployeeBasicService : IEmployeeBasicRepository
    {
        readonly EmployeeBasicDataService _basicDataService = new EmployeeBasicDataService();
        public GridEntity<EmployeeAllInformation> GetEmployeeInfoSummary(GridOptions options)
        {
            return _basicDataService.GetEmployeeInfoSummary(options);
        }
        public HumanResource_EmployeeBasic Save(HumanResource_EmployeeBasic objEmployeeBasic,
            List<HumanResource_EmployeeEducation> objEducation, HumanResource_EmployeeContact objContact,
            HumanResource_EmployeePassport objPassport, HumanResource_EmployeeDrivingLicense objDrivingLicense)
        {
            var edu_dt = new DataTable();
            edu_dt.Columns.Add("DEGREEID");
            edu_dt.Columns.Add("BOARDID");
            edu_dt.Columns.Add("PASSINGYEAR");
            edu_dt.Columns.Add("INSTITUTE");
            edu_dt.Columns.Add("RESULT");
            edu_dt.Columns.Add("OUTOF");
            if (objEducation != null && objEducation.Count > 0)
                foreach (var objedu in objEducation)
                {
                    DataRow row1;
                    row1 = edu_dt.NewRow();
                    row1["DEGREEID"] = objedu.degree.DegreeID;
                    row1["BOARDID"] = objedu.board.BoardID;
                    row1["PASSINGYEAR"] = objedu.PassingYear;
                    row1["INSTITUTE"] = objedu.Institute;
                    row1["RESULT"] = objedu.Result;
                    row1["OUTOF"] = objedu.OutOf;

                    edu_dt.Rows.Add(row1);
                }
            edu_dt.TableName = "tblEducation";
            DataSet dsEducation = new DataSet("dsEducation");
            dsEducation.Tables.Add(edu_dt);

            return _basicDataService.Save(objEmployeeBasic, dsEducation, objContact, objPassport, objDrivingLicense);
        }

        public List<TreeItem> GetEmployeeTreeResult()
        {

            var res = _basicDataService.GetEmployeeTreeResult("Get_Employee_For_Tree_Company");
            var comListList = ListConversion.ConvertTo<TreeItem>(res);
            if (comListList.Count > 0)
            {
                for (int y = 0; y < comListList.Count; y++)
                {
                    res = _basicDataService.GetEmployeeTreeResult("Get_Employee_For_Tree_Unit", comListList[y].id.ToString());
                    var unitList = ListConversion.ConvertTo<TreeItem>(res);
                    if (unitList.Count > 0)
                    {
                        comListList[y].items = new List<TreeItem>();
                        for (int i = 0; i < unitList.Count; i++)
                        {
                            comListList[y].items.Add(unitList[i]);
                            res = _basicDataService.GetEmployeeTreeResult("Get_Employee_For_Tree_Department", unitList[i].id.ToString());
                            var deptList = ListConversion.ConvertTo<TreeItem>(res);
                            if (deptList.Count > 0)
                            {
                                comListList[y].items[i].items = new List<TreeItem>();
                                for (int j = 0; j < deptList.Count; j++)
                                {
                                    comListList[y].items[i].items.Add(deptList[j]);
                                    res = _basicDataService.GetEmployeeTreeResult("Get_Employee_For_Tree_Section", unitList[i].id.ToString(), deptList[j].id.ToString());
                                    var secList = ListConversion.ConvertTo<TreeItem>(res);
                                    if (secList.Count > 0)
                                    {
                                        comListList[y].items[i].items[j].items = new List<TreeItem>();
                                        for (int k = 0; k < secList.Count; k++)
                                        {
                                            comListList[y].items[i].items[j].items.Add(secList[k]);
                                            res = _basicDataService.GetEmployeeTreeResult("Get_Employee_For_Tree_Wing", unitList[i].id.ToString(), deptList[j].id.ToString(), secList[k].id.ToString());
                                            var wList = ListConversion.ConvertTo<TreeItem>(res);
                                            if (wList.Count > 0)
                                            {
                                                comListList[y].items[i].items[j].items[k].items = new List<TreeItem>();
                                                for (int l = 0; l < wList.Count; l++)
                                                {
                                                    comListList[y].items[i].items[j].items[k].items.Add(wList[l]);
                                                    res = _basicDataService.GetEmployeeTreeResult("Get_Employee_For_Tree_Team", unitList[i].id.ToString(), deptList[j].id.ToString(), secList[k].id.ToString(), wList[l].id.ToString());
                                                    var tList = ListConversion.ConvertTo<TreeItem>(res);
                                                    if (tList.Count > 0)
                                                    {
                                                        comListList[y].items[i].items[j].items[k].items[l].items = new List<TreeItem>();
                                                        for (int m = 0; m < tList.Count; m++)
                                                        {
                                                            comListList[y].items[i].items[j].items[k].items[l].items.Add(tList[m]);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return comListList.ToList();
        }


        public GridEntity<EmployeeAllInformation> GetEmployeeSummary(GridOptions options, List<TreeItem> treelist, string searchKey, int status)
        {

            string condition = "", comids = "", unitids = "", deptids = "", sectionids = "", wingids = "", teamids = "";

            if (!string.IsNullOrEmpty(searchKey))
            {
                condition = " Where EmpCode like '%" + searchKey + "%' or Name like '%" + searchKey + "%' or DesignationName like '%" + searchKey + "%'";
            }
            else
            {
                if (status != 0)
                {
                    condition = " Where EmpStatusID =" + status;
                }

                if (treelist == null || treelist.Count < 1) return _basicDataService.GetEmployeeSummary(options, condition);

                foreach (var tr in treelist)
                {
                    switch (tr.Tag)
                    {
                        case "Company":
                            comids += "," + tr.id;
                            break;
                        case "Unit":
                            unitids += "," + tr.id;
                            break;
                        case "Dept":
                            deptids += "," + tr.id;
                            break;
                        case "Sec":
                            sectionids += "," + tr.id;
                            break;
                        case "Wing":
                            wingids += "," + tr.id;
                            break;
                        case "Team":
                            teamids += "," + tr.id;
                            break;
                    }
                }

                if (comids != "")
                {
                    if (status == 0)
                    {
                        comids = " WHERE U.CompanyID in (" + comids.Substring(1) + ")";
                    }
                    else
                    {
                        comids = " and U.CompanyID in (" + comids.Substring(1) + ")";
                    }

                }
                if (unitids != "")
                {
                    unitids = " and U.UnitId in (" + unitids.Substring(1) + ")";
                }
                if (deptids != "")
                {
                    deptids = " And (DepartmentID in (" + deptids.Substring(1) + ") or (DepartmentID IS NULL))";
                }
                if (sectionids != "")
                {
                    sectionids = " And (SectionID in (" + sectionids.Substring(1) + ") or (SectionID IS NULL))";
                }
                if (wingids != "")
                {
                    wingids = " And (WingID in (" + wingids.Substring(1) + ") or (WingID IS NULL))";
                }
                if (teamids != "")
                {
                    teamids = " And (TeamID in (" + teamids.Substring(1) + ") or (TeamID IS NULL))";
                }

                condition = condition + comids + unitids + deptids + sectionids + wingids + teamids;
            }

            return _basicDataService.GetEmployeeSummary(options, condition);
        }
    }
}
