using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;
using BLL.HRM.Company;
using DAL.HRM;

namespace BLL.HRM.Company
{
    public class CompanyService : ICompanyRepository
    {
        readonly CompanyDataService _CompanyDataService = new CompanyDataService();
        public string SaveCompany(Common_Company objCompany)
        {
            return _CompanyDataService.SaveCompany(objCompany);
        }

        public GridEntity<Common_Company> GetCompanySummary(GridOptions options)
        {
            return _CompanyDataService.GetCompanySummary(options);
        }

        public List<Common_Company> GetAllCompany()
        {
            return _CompanyDataService.GetAllCompany();
        }
    }
}