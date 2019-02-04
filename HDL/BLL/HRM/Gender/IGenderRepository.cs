using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.Gender
{
    public interface IGenderRepository
    {
        List<Common_Gender> GetGenders();
    }
}
