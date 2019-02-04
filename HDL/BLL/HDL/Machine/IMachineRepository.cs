using DBManager;

namespace BLL.HDL.Machine
{
    public interface IMachineRepository
    {
        string SaveMachine(Entities.HDL.MachineEntity machineEntity);
        GridEntity<Entities.HDL.MachineEntity> GetMachineSummary(GridOptions options);
    }
}
