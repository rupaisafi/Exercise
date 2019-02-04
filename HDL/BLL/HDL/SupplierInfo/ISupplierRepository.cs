using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.SupplierInfo
{
    public interface ISupplierRepository
    {
        string SaveSupplierInfo(Supplier objSupplier);
        GridEntity<Supplier> GetSupplierInfoSummary(GridOptions options);
        List<Supplier> GetAllSupplier();
        Supplier GetMaxSupplierCode();
    }
}
