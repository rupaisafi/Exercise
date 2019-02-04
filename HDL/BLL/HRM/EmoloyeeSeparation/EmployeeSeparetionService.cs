using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using DBManager;
using Entities.HDL;
using Entities.HRM;

namespace BLL.HRM.EmoloyeeSeparation
{
    public class EmployeeSeparetionService : IEmployeeSeparetionRepository
    {
        readonly EmployeeSeparetionDataService _dataService = new EmployeeSeparetionDataService();
        public string Save(HumanResource_EmployeeSeparation objSeparation, User user)
        {
            //string rv = "";
            //try
            //{

            //    HumanResource_EmployeeSeparation spr = new HumanResource_EmployeeSeparation
            //    {
            //        EmpID = item.EmpID,
            //        EmpStatusID = objSeparation.EmpStatusID,
            //        SubmissionDate = objSeparation.SubmissionDate,
            //        EffectDate = objSeparation.EffectDate,
            //        NoticePeriod = objSeparation.NoticePeriod,
            //        IsWaive = objSeparation.IsWaive,
            //        //RefNo = objSeparation.RefNo,
            //        Remarks = objSeparation.Remarks
            //    };
            return _dataService.Save(objSeparation, user);


            //    rv = Operation.Success.ToString();
            //}
            //catch (Exception)
            //{
            //    rv = Operation.Error.ToString();
            //}

            //return rv;
        }

        public HumanResource_EmployeeSeparation GetEmployeeSeparation(long empId)
        {
            return _dataService.GetEmployeeSeparation(empId);
        }
    }
}
