using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.BloodGroup
{
    public interface IBloodGroupRepository
    {
        List<Common_BloodGroup> GetBloodGroups();
    }
}
