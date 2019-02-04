using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using DBManager;
using Entities.HDL;
using Entities.HRM;

namespace BLL.HRM.EmployeeShift
{
    public class EmployeeShiftService : IEmployeeShiftRepository
    {
        readonly EmployeeShiftDataService _dataService = new EmployeeShiftDataService();
        public List<Common_Shift> GetShifts()
        {
            return _dataService.GetShifts();
        }

        public string Save(List<HumanResource_EmployeeBasic> objEmployee, Common_Shift objShift, User user)
        {
            string rv = "";
            try
            {
                foreach (var item in objEmployee)
                {
                    Common_Shift Ss = new Common_Shift();
                    Ss.EmpID = item.EmpID;
                    Ss.ShiftID = objShift.ShiftID;
                    Ss.StartDate = objShift.StartDate;
                    _dataService.Save(Ss,user);
                }

                rv = Operation.Success.ToString();
            }
            catch (Exception e)
            {
                rv= Operation.Error.ToString();
            }

            return rv;
        }

        public List<Common_Shift> GetEmployeeShift(long empID)
        {
            return _dataService.GetEmployeeShift(empID);
        }
    }
}
