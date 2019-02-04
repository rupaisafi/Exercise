using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using AUtilities;
using DAL.Common;
using DBManager;
using DBManager.StoreProcedureHRM;
using Entities.HRM;


namespace DAL.HRM
{
    public class EducationDataService
    {
        readonly CommonDataServiceHRM _common = new CommonDataServiceHRM();
        public List<Common_Degree> GetAllDegree()
        {
            return _common.Select_Data_List<Common_Degree>("sp_Select_Education", "Get_Degree_For_Combo");
           // return Kendo<DegreeInfo>.Combo.DataSource("");
        }

        public List<Common_Board> GetAllBoard()
        {
            return _common.Select_Data_List<Common_Board>("sp_Select_Education", "Get_Board_For_Combo");
        }

        public List<HumanResource_EmployeeEducation> GetEducationInfo()
        {
          var res=  _common.Select_Data_List<HumanResource_EmployeeEducation>( "sp_Select_Education", "get_education_summary");
            return res;
        }

        public List<HumanResource_EmployeeEducation> GetEmpEducation(int empID)
        {
           var res= _common.Select_Generic_Data_List<HumanResource_EmployeeEducation>("sp_Select_Education", "Get_EmpEducation_For_Grid",empID.ToString());

            return res;
        }
    }
}
