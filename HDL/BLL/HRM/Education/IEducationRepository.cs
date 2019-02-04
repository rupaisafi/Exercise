using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;


namespace BLL.HRM.Education
{
    public interface IEducationRepository
    {

        List<Common_Degree> GetAllDegree();

        List<Common_Board> GetAllBoard();
        List<HumanResource_EmployeeEducation> GetEducationInfo();
        List<HumanResource_EmployeeEducation> GetEmpEducation(int empID);
    }
}
