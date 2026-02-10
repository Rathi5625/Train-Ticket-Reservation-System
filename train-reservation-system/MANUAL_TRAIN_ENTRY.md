# Manual Train Entry Guide

## ✅ External API Removed

The external API integration has been removed. You can now add trains manually through the Admin Dashboard.

## 🚂 How to Add Trains Manually

### Method 1: Using Admin Dashboard (Recommended)

1. **Login as Admin**
   - Go to `http://localhost:5173`
   - Login with admin credentials

2. **Navigate to Trains Tab**
   - Click on **Admin Dashboard**
   - Click on **Trains** tab

3. **Click "Add New Train"**
   - Fill in the train details:
     - **Train Number**: e.g., `12951`
     - **Train Name**: e.g., `Mumbai Rajdhani`
     - **Source**: e.g., `Delhi`
     - **Destination**: e.g., `Mumbai`
     - **Departure Time**: Select date and time
     - **Arrival Time**: Select date and time
     - **Total Seats**: e.g., `100`
     - **Fare per Seat**: e.g., `2500`
     - **Class**: Select from dropdown (Sleeper, AC 3 Tier, etc.)

4. **Click "Create Train"**
   - Train will be added to the database
   - Users can now search and book this train

### Method 2: Using SQL Script

1. **Access H2 Console**
   - Go to `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:traindb`
   - Username: `sa`
   - Password: (leave empty)

2. **Run Sample Data Script**
   - Open file: `backend/src/main/resources/sample-trains.sql`
   - Copy the SQL statements
   - Paste into H2 Console
   - Click "Run"

3. **Verify**
   - Go to Admin Dashboard → Trains tab
   - You should see all the trains

## 📋 Sample Train Data Included

The `sample-trains.sql` file includes **20 popular trains** on these routes:

### Major Routes:
- ✅ **Delhi → Mumbai** (3 trains)
- ✅ **Delhi → Bangalore** (2 trains)
- ✅ **Delhi → Chennai** (2 trains)
- ✅ **Delhi → Kolkata** (2 trains)
- ✅ **Delhi → Jaipur** (2 trains)
- ✅ **Mumbai → Bangalore** (2 trains)
- ✅ **Mumbai → Chennai** (2 trains)
- ✅ **Mumbai → Kolkata** (2 trains)
- ✅ **Bangalore → Chennai** (2 trains)
- ✅ **Bhopal → Mumbai** (2 trains)

### Train Classes Available:
- 🛏️ **SLEEPER** - Budget option
- ❄️ **AC_3_TIER** - 3-tier AC
- ❄️ **AC_2_TIER** - 2-tier AC
- ❄️ **AC_1_TIER** - First AC
- 👑 **FIRST_CLASS** - Premium

## 🎯 Quick Add Examples

### Example 1: Delhi to Mumbai Rajdhani
```
Train Number: 12951
Train Name: Mumbai Rajdhani
Source: Delhi
Destination: Mumbai
Departure: 2026-04-24 16:55
Arrival: 2026-04-25 08:35
Total Seats: 100
Fare: 2500
Class: AC_2_TIER
```

### Example 2: Bangalore to Chennai Express
```
Train Number: 12639
Train Name: Brindavan Express
Source: Bangalore
Destination: Chennai
Departure: 2026-04-24 07:00
Arrival: 2026-04-24 12:30
Total Seats: 100
Fare: 600
Class: AC_3_TIER
```

### Example 3: Delhi to Jaipur Shatabdi
```
Train Number: 12015
Train Name: Ajmer Shatabdi
Source: Delhi
Destination: Jaipur
Departure: 2026-04-24 06:05
Arrival: 2026-04-24 10:30
Total Seats: 80
Fare: 800
Class: AC_1_TIER
```

## 🔧 Search Box Fixed!

The search box input issue has been fixed. You can now:
- ✅ Type in the "From" field
- ✅ Type in the "To" field
- ✅ Select a date
- ✅ Click "Search Trains"

**Fix Applied:** Added `pointer-events: none` to the decorative border element that was blocking clicks.

## 📊 Train Data Format

When adding trains manually, use this format:

| Field | Type | Example | Required |
|-------|------|---------|----------|
| Train Number | Text | 12951 | Yes |
| Train Name | Text | Mumbai Rajdhani | Yes |
| Source | Text | Delhi | Yes |
| Destination | Text | Mumbai | Yes |
| Departure Time | DateTime | 2026-04-24 16:55 | Yes |
| Arrival Time | DateTime | 2026-04-25 08:35 | Yes |
| Total Seats | Number | 100 | Yes |
| Fare per Seat | Decimal | 2500.00 | Yes |
| Train Class | Dropdown | AC_2_TIER | Yes |

## 💡 Pro Tips

1. **Use Realistic Dates**
   - Set departure dates in the future
   - Ensure arrival time is after departure time

2. **Popular Routes First**
   - Add trains on high-demand routes first
   - Delhi-Mumbai, Bangalore-Chennai, etc.

3. **Vary Train Classes**
   - Offer different price points
   - Sleeper for budget, AC for comfort

4. **Reasonable Seat Counts**
   - Typical: 80-150 seats per train
   - Adjust based on train class

5. **Competitive Pricing**
   - Sleeper: ₹400-1000
   - AC 3 Tier: ₹1200-2000
   - AC 2 Tier: ₹2000-3000
   - AC 1 Tier: ₹3000-4000

## 🚀 Quick Start

**Option A: Use Sample Data (Fastest)**
```
1. Backend is running on http://localhost:8080
2. Go to http://localhost:8080/h2-console
3. Login (URL: jdbc:h2:mem:traindb, User: sa, Password: empty)
4. Copy SQL from sample-trains.sql
5. Paste and Run
6. Done! 20 trains added
```

**Option B: Add Manually (Custom)**
```
1. Start frontend: npm run dev
2. Login as admin
3. Admin Dashboard → Trains → Add New Train
4. Fill form and submit
5. Repeat for each train
```

## ✨ What Changed

### Removed:
- ❌ External API integration
- ❌ RapidAPI key usage
- ❌ TrainDataImporter component
- ❌ Import Data tab

### Fixed:
- ✅ Search box input blocking issue
- ✅ Simplified admin dashboard
- ✅ Cleaner codebase

### Added:
- ✅ Sample train data SQL script
- ✅ Manual entry guide
- ✅ 20 pre-configured trains

## 📁 Files

- **Sample Data**: `backend/src/main/resources/sample-trains.sql`
- **This Guide**: `MANUAL_TRAIN_ENTRY.md`

## 🆘 Troubleshooting

**Can't type in search box?**
- ✅ Fixed! Refresh the page

**Can't add trains?**
- Ensure you're logged in as ADMIN
- Check all required fields are filled

**Trains not showing in search?**
- Verify source and destination match exactly
- Check the date is correct
- Ensure train status is SCHEDULED

**H2 Console not accessible?**
- Ensure backend is running
- Check URL: http://localhost:8080/h2-console
- Verify JDBC URL: jdbc:h2:mem:traindb

---

**Happy Train Management! 🚂✨**
