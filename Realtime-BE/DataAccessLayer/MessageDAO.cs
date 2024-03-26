using BussinessObject;

namespace DataAccessLayer
{
    public class MessageDAO
    {
        private static MessageDAO instance = null;
        private readonly RealtimeDBContext _context;

        public MessageDAO()
        {
            if(_context == null)
                _context = new RealtimeDBContext();
        }
        public static MessageDAO Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new MessageDAO();
                }
                return instance;
            }
        }

        public async Task<Message?> CreateMessageAsync(Message message)
        {
            try
            {
                await _context.Messages.AddAsync(message);
                if (await _context.SaveChangesAsync() < 1)
                    return null;
                return message;
            }
            catch
            {
                throw;
            }
        }


    }
}
