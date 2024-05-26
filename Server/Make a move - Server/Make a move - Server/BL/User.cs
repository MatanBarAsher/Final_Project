using Make_a_move___Server.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Security.Cryptography.Xml;
using System.Xml.Linq;
using System.Linq;
namespace Make_a_move___Server.BL
{
    public class User
    {
        private string email;
        private string firstName;
        private string lastName;
        private string password;
        private int gender;
        private string[] image;
        private int height;
        private DateTime birthday;
        private string phoneNumber;
        private bool isActive;
        private string city;
        //private string[] preferencesIds;
        private string[] personalInterestsIds;
        private int currentPlace;
        private string persoalText;
        private static List<User> usersList = new List<User>();
        //private static Dictionary<string, string> usersDictionary = new Dictionary<string, string>();
        private static Dictionary<string, List<string>> likedRelationships = new Dictionary<string, List<string>>();
        private Dictionary<string, string> preferencesDictionary = new Dictionary<string, string>();




        public User() { }

        public User(string email, string firstName, string lastName, string password, int gender, string[] image, int height, DateTime birthday, string phoneNumber, bool isActive, string city, string[] personalInterestsIds, int currentPlace, string persoalText, Dictionary<string, string> preferencesDictionary)
        {
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.password = password;
            this.gender = gender;
            this.image = image;
            this.height = height;
            this.birthday = birthday;
            this.phoneNumber = phoneNumber;
            this.isActive = isActive;
            this.city = city;
            //this.preferencesIds = preferencesIds;
            this.personalInterestsIds = personalInterestsIds;
            this.currentPlace = currentPlace;
            this.persoalText = persoalText;
            this.preferencesDictionary = preferencesDictionary;



        }


        public string Email { get => email; set => email = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Password { get => password; set => password = value; }
        public int Gender { get => gender; set => gender = value; }
        public string[] Image { get => image; set => image = value; }
        public int Height { get => height; set => height = value; }
        public DateTime Birthday { get => birthday; set => birthday = value; }
        public string PhoneNumber { get => phoneNumber; set => phoneNumber = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public string City { get => city; set => city = value; }
        public string[] PersonalInterestsIds { get => personalInterestsIds; set => personalInterestsIds = value; }
        //public string[] PreferencesIds { get => preferencesIds; set => preferencesIds = value; }

        public int CurrentPlace { get => currentPlace; set => currentPlace = value; }
        public string PersoalText { get => persoalText; set => persoalText = value; }
        public Dictionary<string, string> PreferencesDictionary { get => preferencesDictionary; set => preferencesDictionary = value; }

        


        public int InsertUser()
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                usersList.Add(this);
                return dbs.InsertUser(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting user", ex);
            }
        }

        public List<User> ReadUsers()
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                return dbs.ReadUsers();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading users", ex);
            }
        }
        //working- without remove from the dictionary after logged out
        //public User CheckLogin()
        //{
        //    try
        //    {
        //        DBservicesUser dbs = new DBservicesUser();
        //        return dbs.CheckLogin(this);

        //    }
        //    catch (Exception ex)
        //    {
        //        //    Log or handle the exception appropriately
        //        throw new Exception("Error checking login", ex);
        //    }
        //}
        public User CheckLogin()
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                User loggedInUser = dbs.CheckLogin(this);

                // If login is successful, return the logged-in user
                if (loggedInUser != null)
                {
                    return loggedInUser;
                }
                else
                {
                    // If login fails (user is not found), remove the user from the dictionary
                    RemoveFromDictionary(this.Email);
                    return null;
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error checking login", ex);
            }
        }



        public User UpdateUser(User newUser)
        {
            try

            {
                DBservicesUser dbs1 = new DBservicesUser();
                List<User> list = dbs1.ReadUsers();
                // Find the user in the UsersList by email
                User userToUpdate = list.Find(u => string.Equals(u.Email.Trim(), newUser.Email.Trim(), StringComparison.OrdinalIgnoreCase));

                if (userToUpdate != null)
                {
                    // Update user information
                    userToUpdate.FirstName = newUser.FirstName;
                    userToUpdate.LastName = newUser.LastName;
                    userToUpdate.Password = newUser.Password;
                    userToUpdate.IsActive = newUser.IsActive;
                    userToUpdate.gender = newUser.gender;
                    userToUpdate.image = newUser.image;
                    userToUpdate.height = newUser.height;
                    userToUpdate.birthday = newUser.birthday;
                    userToUpdate.phoneNumber = newUser.phoneNumber;
                    userToUpdate.city = newUser.city;
                    //userToUpdate.preferencesIds = newUser.preferencesIds;
                    userToUpdate.personalInterestsIds = newUser.personalInterestsIds;
                    userToUpdate.currentPlace = newUser.currentPlace;
                    userToUpdate.preferencesDictionary = newUser.preferencesDictionary;
                    userToUpdate.persoalText = newUser.persoalText;




                    // Update in the database (assuming DBservices has an UpdateUser method)
                    DBservicesUser dbs = new DBservicesUser();
                    return dbs.UpdateUser(userToUpdate);
                }
                else
                {
                    // User not found, handle the case appropriately (return null, throw an exception, etc.)
                    return null; // Or throw new Exception("User not found");
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error updating user", ex);
            }
        }


        public User UpdateUserCurrentPlace(string email, string placeName)
        {
            try
            {
                DBservicesUser dbs1 = new DBservicesUser();
                User newUser = dbs1.GetUserByEmail(email);
                List<User> list = dbs1.ReadUsers();
                // Find the user in the UsersList by email
                User userToUpdate = list.Find(u => string.Equals(u.Email.Trim(), newUser.Email.Trim(), StringComparison.OrdinalIgnoreCase));


                if (userToUpdate != null)
                {
                        Place place = new Place();

                        // Update the currentPlace field
                        userToUpdate.CurrentPlace = place.checkExistingPlaceByName(placeName);

                        // Update in the database
                        DBservicesUser dbs = new DBservicesUser();
                        dbs.UpdateUser(userToUpdate);

                        return userToUpdate;
                    
                }
                else
                {
                    // User not found, handle the case appropriately (return null, throw an exception, etc.)
                    return null; // Or throw new Exception("User not found");
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error updating user", ex);
            }
        }
        public List<User> ReadUsersByPlace(int placeCode)
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                return dbs.ReadUsersByPlace(placeCode);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading users", ex);
            }
        }


        public int CalculateAge(DateTime birthday)
        {
            DateTime today = DateTime.Today;
            int age = today.Year - birthday.Year;
            if (birthday > today.AddYears(-age))
            {
                age--;
            }
            return age;
        }


        //public bool CheckPreferenceses(User u)
        //{
        //    double distance=0;
        //    int age = CalculateAge(u.birthday);
        //    if (this.PreferencesDictionary["gender"] == u.gender.ToString() &&
        //        Int32.Parse(this.PreferencesDictionary["minAge"]) <= age && Int32.Parse(this.PreferencesDictionary["maxAge"]) >= age &&
        //        this.PreferencesDictionary["height"] == u.height.ToString() &&
        //        Double.Parse(this.PreferencesDictionary["minDistance"]) <= distance && Double.Parse(this.PreferencesDictionary["maxDistance"]) >= distance)
        //        {
        //            var SecAge = CalculateAge(this.birthday);
        //            if (u.PreferencesDictionary["gender"] == this.gender.ToString() &&
        //               Int32.Parse(u.PreferencesDictionary["minAge"]) <= age && Int32.Parse(u.PreferencesDictionary["maxAge"]) >= age &&
        //                u.PreferencesDictionary["height"] == this.height.ToString() &&
        //                 Double.Parse(u.PreferencesDictionary["minDistance"]) <= distance && Double.Parse(u.PreferencesDictionary["maxDistance"]) >= distance)
        //                {
        //                return true;
        //                }
        //        }
        //    return false;
        //}


        //public bool CheckPreferenceses(User u)
        //{
        //    double distance = 0; // Assuming a method to calculate distance will be implemented
        //    int age = CalculateAge(u.birthday);
        //    int secAge = CalculateAge(this.birthday);

        //    // Gender checks
        //    bool genderMatches = this.PreferencesDictionary["gender"] == u.gender.ToString();
        //    bool otherGenderMatches = u.PreferencesDictionary["gender"] == this.gender.ToString();

        //    //Gender match?
        //    bool genderCheck = genderMatches && otherGenderMatches;

        //    // Age check
        //    int minAge = Int32.Parse(this.PreferencesDictionary["minAge"]);
        //    int maxAge = Int32.Parse(this.PreferencesDictionary["maxAge"]);
        //    bool ageInRange = minAge <= age && maxAge >= age;
        //    double ageDiff = 0;
        //    if (!ageInRange)
        //    {
        //        int midAge = (minAge + maxAge) / 2;
        //        ageDiff = Math.Abs((double)(age - midAge) / midAge) * 100;
        //    }
        //    // other Age check
        //    int otherMinAge = Int32.Parse(u.PreferencesDictionary["minAge"]);
        //    int otherMaxAge = Int32.Parse(u.PreferencesDictionary["maxAge"]);
        //    bool otherAgeInRange = otherMinAge <= secAge && otherMaxAge >= secAge;

        //    //Age match?
        //    bool ageCheck = ageInRange && otherAgeInRange;

        //    // Height check
        //    int preferredHeight = Int32.Parse(this.PreferencesDictionary["height"]);
        //    bool heightMatches = this.PreferencesDictionary["height"] == u.height.ToString();
        //    double heightDiff = 0;
        //    if (!heightMatches)
        //    {
        //        heightDiff = Math.Abs((double)(u.height - preferredHeight) / preferredHeight) * 100;
        //    }
        //    // other Height check
        //    int otherPreferredHeight = Int32.Parse(u.PreferencesDictionary["height"]);
        //    bool otherHeightMatches = u.PreferencesDictionary["height"] == this.height.ToString();

        //    //Height match?
        //    bool heightCheck = heightMatches && otherHeightMatches;


        //    // Distance check
        //    double minDistance = Double.Parse(this.PreferencesDictionary["minDistance"]);
        //    double maxDistance = Double.Parse(this.PreferencesDictionary["maxDistance"]);
        //    bool distanceInRange = minDistance <= distance && maxDistance >= distance;
        //    double distanceDiff = 0;
        //    if (!distanceInRange)
        //    {
        //        double midDistance = (minDistance + maxDistance) / 2;
        //        distanceDiff = Math.Abs((distance - midDistance) / midDistance) * 100;
        //    }
        //    // other Distance check
        //    double otherMinDistance = Double.Parse(u.PreferencesDictionary["minDistance"]);
        //    double otherMaxDistance = Double.Parse(u.PreferencesDictionary["maxDistance"]);
        //    bool otherDistanceInRange = otherMinDistance <= distance && otherMaxDistance >= distance;

        //    //Distance match?
        //    bool DisCheck = distanceInRange && otherDistanceInRange;

        //    //100% match
        //    bool userPreferencesMatch = genderCheck && ageCheck && heightCheck && DisCheck;
        //    double totalDiff = 1;

        //    //Calc partial match
        //    if (userPreferencesMatch!)
        //    {
        //        if (otherGenderMatches && otherAgeInRange && otherHeightMatches && otherDistanceInRange)
        //        {
        //            totalDiff = (heightDiff + distanceDiff + ageDiff) / 3;
        //        }

        //        totalDiff = 0;
        //    }
        //    return userPreferencesMatch;

        //}

        //public bool CheckPreferenceses(User u)
        //{
        //    double distance = 0; // Assuming a method to calculate distance will be implemented
        //    int age = CalculateAge(u.birthday);
        //    int secAge = CalculateAge(this.birthday);

        //    // Gender checks
        //    bool genderMatches = this.PreferencesDictionary["gender"] == u.gender.ToString();
        //    bool otherGenderMatches = u.PreferencesDictionary["gender"] == this.gender.ToString();
        //    //Gender match?
        //    bool genderCheck = genderMatches && otherGenderMatches;

        //    // Age check
        //    int minAge = Int32.Parse(this.PreferencesDictionary["minAge"]);
        //    int maxAge = Int32.Parse(this.PreferencesDictionary["maxAge"]);
        //    bool ageInRange = minAge <= age && maxAge >= age; 
        //    // other Age check
        //    int otherMinAge = Int32.Parse(u.PreferencesDictionary["minAge"]);
        //    int otherMaxAge = Int32.Parse(u.PreferencesDictionary["maxAge"]);
        //    bool otherAgeInRange = otherMinAge <= secAge && otherMaxAge >= secAge;
        //    //Age match?
        //    bool ageCheck = ageInRange && otherAgeInRange;

        //    // Height check
        //    int preferredHeight = Int32.Parse(this.PreferencesDictionary["height"]);
        //    bool heightMatches = this.PreferencesDictionary["height"] == u.height.ToString();
        //    // other Height check
        //    int otherPreferredHeight = Int32.Parse(u.PreferencesDictionary["height"]);
        //    bool otherHeightMatches = u.PreferencesDictionary["height"] == this.height.ToString();
        //    //Height match?
        //    bool heightCheck = heightMatches && otherHeightMatches;


        //    // Distance check
        //    double minDistance = Double.Parse(this.PreferencesDictionary["minDistance"]);
        //    double maxDistance = Double.Parse(this.PreferencesDictionary["maxDistance"]);
        //    bool distanceInRange = minDistance <= distance && maxDistance >= distance;
        //    // other Distance check
        //    double otherMinDistance = Double.Parse(u.PreferencesDictionary["minDistance"]);
        //    double otherMaxDistance = Double.Parse(u.PreferencesDictionary["maxDistance"]);
        //    bool otherDistanceInRange = otherMinDistance <= distance && otherMaxDistance >= distance;
        //    //Distance match?
        //    bool DisCheck = distanceInRange && otherDistanceInRange;

        //    //100% match
        //    bool userPreferencesMatch = genderCheck && ageCheck && heightCheck && DisCheck;

        //    return userPreferencesMatch;

        //}

        //public (User user, double matchPercentage) CalculateMatchPercentage(User u)
        //{
        //    DBservicesCity dbServices = new DBservicesCity();
        //    double distance = dbServices.ReadDistance(Int32.Parse(this.city), Int32.Parse(u.city)); // Assuming a method to calculate distance will be implemented
        //    int age = CalculateAge(u.birthday);
        //    int secAge = CalculateAge(this.birthday);

        //    // Gender checks
        //    bool genderMatches = this.PreferencesDictionary["gender"] == u.gender.ToString();
        //    bool otherGenderMatches = u.PreferencesDictionary["gender"] == this.gender.ToString();

        //    // Gender match?
        //    bool genderCheck = genderMatches && otherGenderMatches;

        //    // Age check
        //    int minAge = Int32.Parse(this.PreferencesDictionary["minAge"]);
        //    int maxAge = Int32.Parse(this.PreferencesDictionary["maxAge"]);
        //    bool ageInRange = minAge <= age && maxAge >= age;

        //    // Other Age check
        //    int otherMinAge = Int32.Parse(u.PreferencesDictionary["minAge"]);
        //    int otherMaxAge = Int32.Parse(u.PreferencesDictionary["maxAge"]);
        //    bool otherAgeInRange = otherMinAge <= secAge && otherMaxAge >= secAge;

        //    // Age match?
        //    bool ageCheck = ageInRange && otherAgeInRange;

        //    // Height check
        //    int preferredHeight = Int32.Parse(this.PreferencesDictionary["height"]);
        //    bool heightMatches = this.PreferencesDictionary["height"] == u.height.ToString();

        //    // Other Height check
        //    int otherPreferredHeight = Int32.Parse(u.PreferencesDictionary["height"]);
        //    bool otherHeightMatches = u.PreferencesDictionary["height"] == this.height.ToString();

        //    // Height match?
        //    bool heightCheck = heightMatches && otherHeightMatches;

        //    // Distance check 
        //    double maxDistance = Double.Parse(this.PreferencesDictionary["maxDistance"]);
        //    bool distanceInRange =  maxDistance >= distance;

        //    // Other Distance check
        //    double otherMaxDistance = Double.Parse(u.PreferencesDictionary["maxDistance"]);
        //    bool otherDistanceInRange =  otherMaxDistance >= distance;

        //    // Distance match?
        //    bool distanceCheck = distanceInRange && otherDistanceInRange;

        //    // 100% match
        //    bool userPreferencesMatch = genderCheck && ageCheck && heightCheck && distanceCheck;

        //    if (userPreferencesMatch)
        //    {
        //        return (u, 100.0); // 100% match
        //    }

        //    double totalDiff = 0;

        //    // Calculate differences if 'other' checks are true
        //    if ((!userPreferencesMatch) && otherGenderMatches)
        //    {
        //        double ageDiff = 0, heightDiff = 0, distanceDiff = 0;

        //        if (!ageInRange)
        //        {

        //            if (age > maxAge)
        //            {
        //                ageDiff = 100 - (age - maxAge) * 2;
        //            }
        //            else ageDiff = 100 - (minAge - age) * 2;
        //        }
        //        else ageDiff = 100;

        //        if (!heightMatches)
        //        {
        //            heightDiff = 100 - Math.Abs((double)(u.height - preferredHeight))*2 ;
        //        }
        //        else heightDiff = 100;

        //        if (!distanceInRange)
        //        {
        //            distanceDiff = 100- Math.Abs(distance - maxDistance)*2 ;
        //        }
        //        else distanceDiff = 100;

        //        totalDiff = (heightDiff + distanceDiff + ageDiff) / 3;
        //    }
        //    if (totalDiff == 0) 
        //    { return (u, totalDiff); }

        //    double matchPercentage = totalDiff;
        //    return (u, matchPercentage);
        //}

        //public Dictionary<User, double> ReadUsersByPreference(User user)
        //{
        //    List<User> list = user.ReadUsersByPlace(user.currentPlace);
        //    Dictionary<User, double> result = new Dictionary<User, double>();

        //    foreach (User u in list)
        //    {
        //        // Calculate the match percentage
        //        var (matchedUser, matchPercentage) = user.CalculateMatchPercentage(u);

        //        // If the user completely matches the preferences (i.e., 100% match), add them to the result
        //        if (matchPercentage == 100.0)
        //        {
        //            result[matchedUser] = matchPercentage;
        //        }
        //        // Otherwise, if the user partially matches (i.e., the matchPercentage is calculated)
        //        else if (!result.ContainsKey(matchedUser)) 
        //        {

        //             if (matchPercentage > 0) // Check if matchPercentage is greater than 0
        //              {
        //                    result.Add(matchedUser, matchPercentage);
        //              }
        //        }
        //    }

        //    // Print the result
        //    Console.WriteLine("Users matching preferences:");
        //    foreach (var pair in result)
        //    {
        //        Console.WriteLine($"User: {pair.Key.FirstName} {pair.Key.LastName}, Match Percentage: {pair.Value}");
        //    }
        //    return result;
        //}

        //public (User user, double matchPercentage, double othermatchPercentag) CalculateMatchPercentage(User u)
        //{
        //    double agePrecentag;
        //    double otherAgePrecentag;
        //    double heighPrecentag;
        //    double otherHeightPrecentag;
        //    double distancePrecentag;
        //    double otherdistancePrecentag;
        //    DBservicesCity dbServices = new DBservicesCity();
        //    double distance = dbServices.ReadDistance(Int32.Parse(this.city), Int32.Parse(u.city)); 
        //    int age = CalculateAge(u.birthday);
        //    int secAge = CalculateAge(this.birthday);

        //    // Gender checks
        //    bool genderMatches = this.PreferencesDictionary["gender"] == u.gender.ToString();
        //    bool otherGenderMatches = u.PreferencesDictionary["gender"] == this.gender.ToString();

        //    // Gender match?
        //    bool genderCheck = genderMatches && otherGenderMatches;

        //    // Age check
        //    int minAge = Int32.Parse(this.PreferencesDictionary["minAge"]);
        //    int maxAge = Int32.Parse(this.PreferencesDictionary["maxAge"]);
        //    if (minAge <= age && maxAge >= age)
        //    {
        //        agePrecentag = 100;

        //    }
        //    else if (age > maxAge)
        //    {
        //        agePrecentag = 100 - (age - maxAge) * 2;
        //    }else agePrecentag = 100 - (minAge - age) * 2;


        //    // Other Age check
        //    int otherMinAge = Int32.Parse(u.PreferencesDictionary["minAge"]);
        //    int otherMaxAge = Int32.Parse(u.PreferencesDictionary["maxAge"]);
        //    if (otherMinAge <= secAge && otherMaxAge >= secAge)
        //    {
        //        otherAgePrecentag = 100;

        //    }
        //    else if (secAge > otherMaxAge)
        //    {
        //        otherAgePrecentag = 100 - (secAge - otherMaxAge) * 2;
        //    }
        //    else otherAgePrecentag = 100 - (otherMinAge - secAge) * 2;


        //    // Height check
        //    int preferredHeight = Int32.Parse(this.PreferencesDictionary["height"]);
        //    if (preferredHeight == u.height) 
        //    {
        //        heighPrecentag = 100;
        //    }
        //    else heighPrecentag = 100 - Math.Abs((double)(preferredHeight - u.height)) * 2;


        //    // Other Height check
        //    int otherPreferredHeight = Int32.Parse(u.PreferencesDictionary["height"]);
        //    if(otherPreferredHeight == this.height) 
        //    {
        //        otherHeightPrecentag = 100;
        //    }
        //    else otherHeightPrecentag = 100 - Math.Abs((double)(u.height - otherPreferredHeight)) * 2;


        //    // Distance check 
        //    double maxDistance = Double.Parse(this.PreferencesDictionary["maxDistance"]);
        //    if (maxDistance >= distance) 
        //    {
        //        distancePrecentag = 100;
        //    }
        //    else distancePrecentag = 100 - Math.Abs(distance - maxDistance) * 2;

        //    // Other Distance check
        //    double otherMaxDistance = Double.Parse(u.PreferencesDictionary["maxDistance"]);
        //    if (otherMaxDistance >= distance)
        //    {
        //        otherdistancePrecentag = 100;
        //    }
        //    else otherdistancePrecentag = 100 - Math.Abs(distance - otherMaxDistance) * 2;

        //    double calMatchPrecentage = (agePrecentag + heighPrecentag + distancePrecentag) / 3;
        //    double otherCalMatchPrecentage = (otherAgePrecentag + otherHeightPrecentag + otherdistancePrecentag) / 3;

        //    {
        //        return (u, calMatchPrecentage, otherCalMatchPrecentage);
        //    }


        //}

        public Dictionary<User, Tuple<double, double>> CalculateMatchPercentage(User u)
        {
            // Perform the gender check first
            bool genderMatches = this.PreferencesDictionary["gender"] == u.Gender.ToString();
            bool otherGenderMatches = u.PreferencesDictionary["gender"] == this.Gender.ToString();

            // If gender check fails, return an empty dictionary
            if (!genderMatches || !otherGenderMatches)
            {
                return new Dictionary<User, Tuple<double, double>>();
            }

            double agePercentage;
            double otherAgePercentage;
            double heightPercentage;
            double otherHeightPercentage;
            double distancePercentage;
            double otherDistancePercentage;

            DBservicesCity dbServices = new DBservicesCity();
            double distance = dbServices.ReadDistance(Int32.Parse(this.City), Int32.Parse(u.City));
            int age = CalculateAge(u.Birthday);
            int secAge = CalculateAge(this.Birthday);

            // Age check
            int minAge = Int32.Parse(this.PreferencesDictionary["minAge"]);
            int maxAge = Int32.Parse(this.PreferencesDictionary["maxAge"]);
            if (minAge <= age && maxAge >= age)
            {
                agePercentage = 100;
            }
            else if (age > maxAge)
            {
                agePercentage = 100 - (age - maxAge) * 2;
            }
            else
            {
                agePercentage = 100 - (minAge - age) * 2;
            }
            agePercentage = Math.Max(agePercentage, 0); // Ensure percentage is not negative

            // Other Age check
            int otherMinAge = Int32.Parse(u.PreferencesDictionary["minAge"]);
            int otherMaxAge = Int32.Parse(u.PreferencesDictionary["maxAge"]);
            if (otherMinAge <= secAge && otherMaxAge >= secAge)
            {
                otherAgePercentage = 100;
            }
            else if (secAge > otherMaxAge)
            {
                otherAgePercentage = 100 - (secAge - otherMaxAge) * 2;
            }
            else
            {
                otherAgePercentage = 100 - (otherMinAge - secAge) * 2;
            }
            otherAgePercentage = Math.Max(otherAgePercentage, 0); // Ensure percentage is not negative

            // Height check
            int preferredHeight = Int32.Parse(this.PreferencesDictionary["height"]);
            if (preferredHeight == u.Height)
            {
                heightPercentage = 100;
            }
            else
            {
                heightPercentage = 100 - Math.Abs((double)(preferredHeight - u.Height)) * 2;
            }
            heightPercentage = Math.Max(heightPercentage, 0); // Ensure percentage is not negative

            // Other Height check
            int otherPreferredHeight = Int32.Parse(u.PreferencesDictionary["height"]);
            if (otherPreferredHeight == this.Height)
            {
                otherHeightPercentage = 100;
            }
            else
            {
                otherHeightPercentage = 100 - Math.Abs((double)(u.Height - otherPreferredHeight)) * 2;
            }
            otherHeightPercentage = Math.Max(otherHeightPercentage, 0); // Ensure percentage is not negative

            // Distance check 
            double maxDistance = Double.Parse(this.PreferencesDictionary["maxDistance"]);
            if (maxDistance >= distance)
            {
                distancePercentage = 100;
            }
            else
            {
                distancePercentage = 100 - Math.Abs(distance - maxDistance) * 2;
            }
            distancePercentage = Math.Max(distancePercentage, 0); // Ensure percentage is not negative

            // Other Distance check
            double otherMaxDistance = Double.Parse(u.PreferencesDictionary["maxDistance"]);
            if (otherMaxDistance >= distance)
            {
                otherDistancePercentage = 100;
            }
            else
            {
                otherDistancePercentage = 100 - Math.Abs(distance - otherMaxDistance) * 2;
            }
            otherDistancePercentage = Math.Max(otherDistancePercentage, 0); // Ensure percentage is not negative

            double calMatchPercentage = (agePercentage + heightPercentage + distancePercentage) / 3;
            double otherCalMatchPercentage = (otherAgePercentage + otherHeightPercentage + otherDistancePercentage) / 3;

            return new Dictionary<User, Tuple<double, double>>
    {
        { u, new Tuple<double, double>(calMatchPercentage, otherCalMatchPercentage) }
    };
        }

        public Dictionary<User, Tuple<double, double>> ReadUsersByPreference()
        {
            List<User> list = this.ReadUsersByPlace(this.CurrentPlace);
            Dictionary<User, Tuple<double, double>> result = new Dictionary<User, Tuple<double, double>>();

            foreach (User u in list)
            {
                if (u == this)
                {
                    continue;
                }
                // Calculate the match percentage
                var match = this.CalculateMatchPercentage(u);

                // Add matched users to the result
                foreach (var kvp in match)
                {
                    var matchedUser = kvp.Key;
                    var matchPercentages = kvp.Value;

                    // Add only users with a valid match percentage
                    if (matchPercentages.Item1 > 0)
                    {
                        result[matchedUser] = matchPercentages;
                    }
                }
            }

            return result;
        }











        //public Dictionary<User, double> ReadUsersByPreference(User user)
        //{
        //    List<User> list = user.ReadUsersByPlace(user.currentPlace);
        //    Dictionary< User, double> result = new Dictionary<User, double>();

        //    foreach (User u in list)
        //    {
        //        if (user.CheckPreferenceses(u))
        //        {
        //            if (!result.ContainsKey(u))  
        //            {
        //                result.Add(u, );
        //            }
        //        }

        //    }
        //    return result;
        //}


        public User GetUserByEmail(string email)
        {
            try
            {
                // Create an instance of your DAL service
                DBservicesUser dbs = new DBservicesUser();

                // Call the method in your DAL to retrieve the user by email
                User user = dbs.GetUserByEmail(email);

                // Return the user fetched from the database
                return user;
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error getting user by email", ex);
            }
        }



        public void AddToDictionary(string userEmail, string likedUserEmail)
        {
            try
            {
                if (!likedRelationships.ContainsKey(userEmail))
                {
                    likedRelationships[userEmail] = new List<string>();
                }

                if (!likedRelationships[userEmail].Contains(likedUserEmail))
                {
                    likedRelationships[userEmail].Add(likedUserEmail);
                }
                else
                {
                    Console.WriteLine($"The email {likedUserEmail} is already liked by {userEmail}.");
                }
            }
            catch (ArgumentException ex)
            {
                // Handle the case where the key already exists in the dictionary
                // You can log the error or handle it as needed
                throw new Exception("User with the same email already exists in the dictionary.", ex);
            }
        }

        // Method to remove a user from the dictionary
        public void RemoveFromDictionary(string userEmail)
        {
            likedRelationships.Remove(userEmail);
        }

        // Method to get the list of liked users' emails from the dictionary by the user's email
        //public List<string> GetLikedUsersByEmail(string userEmail)
        //{
        //    if (likedRelationships.ContainsKey(userEmail))
        //    {
        //        return likedRelationships[userEmail];
        //    }
        //    else
        //    {
        //        // handle the case where the user with the specified email is not found
        //        // you can return an empty list or throw an exception as needed
        //        return new List<string>(); // or throw new exception("user not found in the dictionary.");
        //    }
        //}

        public static bool SearchUserByEmail(string userEmail, string targetUserEmail)
        {
            if (likedRelationships.TryGetValue(userEmail, out List<string> likedUsers))
            {
                return likedUsers.Contains(targetUserEmail);
            }
            else
            {
                // Handle the case where the user with the specified email is not found
                return false;
            }
        }

        public static Dictionary<string, List<string>> GetDictionary()
        {
            return likedRelationships;
        }

        public User ChangeImages(string email, List<string> images)
        {
            try
            {
                User user = GetUserByEmail(email);
                //user.image = user.Image.Concat(images.ToArray()).ToArray();
                DBservicesUser dbs = new DBservicesUser();
                return dbs.UpdateUser(user);

            }
            catch (Exception ex)
            {
                //    Log or handle the exception appropriately
                throw new Exception("Error changing images", ex);
            }
        }

        public bool LikeUser(string userEmail, string likedUserEmail)
        {
            // Call AddToDictionary to add the liked user
            AddToDictionary(userEmail, likedUserEmail);

            // Call SearchUserByEmail to check if there is a match
            return SearchUserByEmail(likedUserEmail, userEmail);
        }




        public int checkExistingUserByKeyAndValue(string key,string value)
        {
            DBservicesUser dbs1 = new DBservicesUser();
            List<User> list = dbs1.ReadUsers();
            // Find if this value exists
            User user1 = list.Find(u => string.Equals(u.Email.Trim(), value.Trim(), StringComparison.OrdinalIgnoreCase));
            User user2 = list.Find(u => string.Equals(u.PhoneNumber.Trim(), value.Trim(), StringComparison.OrdinalIgnoreCase));
            
            if(user1 == null && user2 == null)
            {
                return 0;
            }
            return 1;

        }



        public User EditPreferences(User user)
        {
            try
            {
                List<User> list = ReadUsers();
                foreach (User u in list)
                {
                    if (user.email == u.email)
                    {
                        u.PreferencesDictionary = user.preferencesDictionary;
                        DBservicesUser dbs = new DBservicesUser();
                        return dbs.UpdateUser(u);
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading data", ex);
            }
        }  

        public List<string> GetUsersEmails()
        {
            List<User> list = ReadUsers();
            List<string> emailsList = new List<string>();
            foreach (var user in list)
            { 
                emailsList.Add(user.Email);
            }
            return emailsList;
        }


        public int AddImage(byte[] imageData, string mimeType)
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                return dbs.AddImage(imageData, mimeType);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting Image", ex);
            }
        }
        
        
        
        
        
        public (byte[] ImageData, string MimeType) GetImage(int imageID)
        {
            try
            {
                DBservicesUser dbs = new DBservicesUser();
                return dbs.GetImage(imageID);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error Getting Image", ex);
            }
        }
    }
}
