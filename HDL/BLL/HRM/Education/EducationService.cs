using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using DBManager;
using Entities.HRM;


namespace BLL.HRM.Education
{
    public class EducationService : IEducationRepository
    {
        private EducationDataService _dataService = new EducationDataService();

        public List<Common_Board> GetAllBoard()
        {
            var resbBoard = _dataService.GetAllBoard();
            return resbBoard;
        }

        public List<HumanResource_EmployeeEducation> GetEducationInfo()
        {
            return _dataService.GetEducationInfo();
        }

        public List<Common_Degree> GetAllDegree()
        {
            var res = _dataService.GetAllDegree();
            return res;
            
        }

        public List<HumanResource_EmployeeEducation> GetEmpEducation(int empID)
        {
            var res= _dataService.GetEmpEducation(empID);
            return res;
        }
    }
}
