using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.Machine
{
    public class MachineService : IMachineRepository
    {
        readonly MachineDataService _dataService = new MachineDataService();

        public string SaveMachine(MachineEntity machineEntity)
        {
            return _dataService.SaveMachine(machineEntity);
        }

        public GridEntity<MachineEntity> GetMachineSummary(GridOptions options)
        {
            return _dataService.GetMachineEntity(options);
        }

    }
}
