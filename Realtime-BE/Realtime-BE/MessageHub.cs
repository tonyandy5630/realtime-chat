using BussinessObject;
using Microsoft.AspNetCore.SignalR;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Realtime_BE
{
    public class MessageHub:Hub
    {
        private readonly IDictionary<string, User> _connections;
        public MessageHub(IDictionary<string, User> connections)
        {
            _connections = connections;
        }

        public async Task JoinRoom(User userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection, $"{userConnection.Username} has joined {userConnection.Room}");
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out User? userConnection))
            {
                Message newMessage = new()
                {
                    Contents = message,
                    CreateAt = DateTime.UtcNow,
                };
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection, newMessage);
            }
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.Username);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

    }
}
