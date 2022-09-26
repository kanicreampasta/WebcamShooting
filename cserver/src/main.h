#include <string>
#include <unordered_map>
#include "types/internal.pb.h"
#include <memory>

namespace webcamshooting
{

    struct Vector3
    {
        float x, y, z;

        Vector3() : x(0), y(0), z(0) {}
    };

    using Pid = std::string;

    struct PlayerInfo
    {
        PlayerInfo(const Pid &pid) : pid_(pid) {}

        Pid pid_;
        Vector3 position_, velocity_;
        float yaw_, pitch_;

        bool is_dead_;

        std::unordered_map<Pid, bool> fire_events_;
        std::vector<DamageInternal> damage_events_;
    };

    class GameServer
    {
    public:
        void new_player(const Pid &pid)
        {
            std::lock_guard<std::mutex> lock(player_list_lock_);
            player_list_.at(pid) = std::make_unique<PlayerInfo>(pid);
        }

        bool remove_player(const Pid &pid)
        {
            std::lock_guard<std::mutex> lock(player_list_lock_);
            return player_list_.erase(pid) == 1;
        }

    private:
        std::unordered_map<Pid, std::unique_ptr<PlayerInfo>> player_list_;
        std::mutex player_list_lock_;
    };
}