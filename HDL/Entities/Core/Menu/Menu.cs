﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Core.Menu
{
    public class Menu
    {
        public int MenuId { get; set; }
        public int ModuleId { get; set; }
        public string MenuName { get; set; }
        public string MenuPath { get; set; }
        public int ParentMenu { get; set; }
        public int TotalCount { get; set; }
        public string ModuleName { get; set; }
        public int ToDo { get; set; }
        public int SortOrder { get; set; }
        public string ParentMenuName { get; set; }

    }
}
