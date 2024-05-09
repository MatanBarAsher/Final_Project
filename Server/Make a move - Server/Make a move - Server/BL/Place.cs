﻿using Make_a_move___Server.DAL;
using System;
namespace Make_a_move___Server.BL
{
    public class Place
    {
        private int placeCode;
        private string name;
        private string adress;
        private string userIds;
        private DateTime timeStamp;
        private string typeOfPlace;
        private static List<Place> placesList = new List<Place>();

        public Place() { }

        public Place(int placeCode, string name, string adress, string userIds, DateTime timeStamp, string typeOfPlace)
        {
            this.placeCode = placeCode;
            this.name = name;
            this.adress = adress;
            this.userIds = userIds;
            this.timeStamp = timeStamp;
            this.typeOfPlace = typeOfPlace;
        }

        public int PlaceCode { get => placeCode; set => placeCode = value; }
        public string Name { get => name; set => name = value; }
        public string Adress { get => adress; set => adress = value; }
        public string UserIds { get => userIds; set => userIds = value; }
        public DateTime TimeStamp { get => timeStamp; set => timeStamp = value; }
        public string TypeOfPlace { get => typeOfPlace; set => typeOfPlace = value; }

        public int InsertPlace()
        {
            try
            {
                DBservicesPlace dbs = new DBservicesPlace();
                placesList.Add(this);
                return dbs.InsertPlace(this);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error inserting place", ex);
            }
        }

        public List<Place> ReadPlaces()
        {
            try
            {
                DBservicesPlace dbs = new DBservicesPlace();
                return dbs.ReadPlaces();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error reading places", ex);
            }
        }

        public Place UpdatePlace(Place newplace)
        {
            try
            {
                // Find the Place in the PlacesList by name
                Place placeToUpdate = placesList.Find(p => p.PlaceCode.Equals(newplace.PlaceCode));

                if (placeToUpdate != null)
                {
                    // Update user information
                    placeToUpdate.Name = newplace.Name;
                    placeToUpdate.PlaceCode = newplace.PlaceCode;
                    placeToUpdate.Adress = newplace.Adress;
                    placeToUpdate.UserIds = newplace.UserIds;
                    placeToUpdate.TimeStamp = newplace.TimeStamp;
                    placeToUpdate.TypeOfPlace = newplace.TypeOfPlace;

                    // Update in the database (assuming DBservices has an UpdatePlace method)
                    DBservicesPlace dbs = new DBservicesPlace();
                    return dbs.UpdatePlace(placeToUpdate);
                }
                else
                {
                    // Place not found, handle the case appropriately (return null, throw an exception, etc.)
                    return null; // Or throw new Exception("Place not found");
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                throw new Exception("Error updating Place", ex);
            }
        }





    }
}
