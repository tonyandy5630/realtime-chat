using System;
using System.Collections.Generic;

namespace BussinessObject
{
    public partial class Message
    {
        public int? MessageId { get; set; }
        public string Contents { get; set; } = null!;
        public int UserId { get; set; }

        public DateTime CreateAt { get; set; }
    }
}
