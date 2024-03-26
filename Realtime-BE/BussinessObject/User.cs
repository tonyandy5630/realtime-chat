using System;
using System.Collections.Generic;

namespace BussinessObject
{
    public partial class User
    {
        public int? UserId { get; set; }
        public string Username { get; set; } = null!;
        public string Room { get; set; }
    }
}
