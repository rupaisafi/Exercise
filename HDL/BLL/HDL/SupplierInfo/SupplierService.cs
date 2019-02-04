using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.SupplierInfo
{
    public class SupplierService : ISupplierRepository
    {
        readonly SupplierDataService _supplierDataService = new SupplierDataService();
        public string SaveSupplierInfo(Supplier objSupplier)
        {
            var res = "";
            var res1 = CheckIsExist(objSupplier.SupplierId, objSupplier.SupplierCode);
            if (!res1)
            {
                res = _supplierDataService.SaveSupplierInfo(objSupplier);
            }
            else
            {
                res = Operation.Exists.ToString();
            }
            return res;
        }

        private bool CheckIsExist(int supplierId, string supplierCode)
        {
            return _supplierDataService.CheckIsExist(supplierId, supplierCode);
        }

        public GridEntity<Supplier> GetSupplierInfoSummary(GridOptions options)
        {
            return _supplierDataService.GetSupplierInfoSummary(options);
        }

        public List<Supplier> GetAllSupplier()
        {
            return _supplierDataService.GetAllSupplier();
        }
        public Supplier GetMaxSupplierCode()
        {
            return _supplierDataService.GetMaxSupplierCode();
        }
    }
}
