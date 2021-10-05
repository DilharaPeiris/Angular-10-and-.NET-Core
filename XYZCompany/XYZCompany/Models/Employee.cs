using System;
namespace XYZCompany.Models
{
    public class Employee
    {
        public Employee()
        {
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Lastame { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string Department { get; set; }
        public string Avatar { get; set; }
    }
}
