﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.Religion
{
    public interface IReligionRepository
    {
        List<Common_Religion> GetReligions();
    }
}
