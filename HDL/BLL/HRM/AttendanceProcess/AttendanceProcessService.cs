using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using DBManager;
using Entities.HDL;
using Entities.HRM;

namespace BLL.HRM.AttendanceProcess
{
    public class AttendanceProcessService : IAttendanceProcessRepository
    {
        private readonly AttendanceProcessDataService _dataService = new AttendanceProcessDataService();
        public string Process(List<HumanResource_EmployeeBasic> objEmployee, ProcessDate objDate, User user)
        {
            string rv = "";
            try
            {
                foreach (var item in objEmployee)
                {
                    ProcessDate p = new ProcessDate
                    {
                        EmpID = item.EmpID,
                        StartDate = objDate.StartDate,
                        EndDate = objDate.EndDate
                    };
                    _dataService.Process(p, user);
                }
                rv = Operation.Success.ToString();
            }
            catch (Exception e)
            {
                rv = Operation.Error.ToString();
            }

            return rv;
        }
    }
}
