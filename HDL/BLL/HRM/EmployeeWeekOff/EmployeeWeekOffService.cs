using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using DBManager;
using Entities.HDL;
using Entities.HRM;

namespace BLL.HRM.EmployeeWeekOff
{
    public class EmployeeWeekOffService : IEmployeeWeekOffRepository
    {
        readonly EmployeeWeekOffDataService _dataService = new EmployeeWeekOffDataService();

        public List<Common_WeekOff> GetEmployeeWeekOff(long empId)
        {
           return _dataService.GetEmployeeWeekOff(empId);
        }

        public string Save(List<HumanResource_EmployeeBasic> objEmployee, DateTime objStartDate, List<Common_WeekOff> objWeekOff, User user)
        {
            string rv = "";
            try
            {
                foreach (var witem in objWeekOff)
                {
                    Common_WeekOff eWeekOff = new Common_WeekOff();
                    eWeekOff.DayID = witem.DayID;
                    eWeekOff.StartDate = objStartDate;

                    foreach (var item in objEmployee)
                    {
                        eWeekOff.EmpID = item.EmpID;
                        _dataService.Save(eWeekOff, user);
                    }
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
