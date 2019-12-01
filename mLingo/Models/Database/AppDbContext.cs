using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace mLingo.Models.Database
{
    public class AppDbContext : IdentityDbContext<AppDbUser>
    {
    }
}
