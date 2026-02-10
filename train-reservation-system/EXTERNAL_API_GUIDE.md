# External Train API Integration Guide

## 🔑 Your RapidAPI Key
```
API Key: af04b150dcmsh5a8af8c069a6058p1ac05djsn0abac66796bb
API Host: irctc1.p.rapidapi.com
```

## 📍 Where the API is Used

Your RapidAPI key is integrated in the following file:
```
frontend/src/services/externalTrainAPI.js
```

This service provides real Indian Railway train data from IRCTC.

## 🚂 How to Import Real Train Data

### Step 1: Access the Admin Dashboard
1. Login with an **ADMIN** account
2. Navigate to the **Admin Dashboard**
3. Click on the **"Import Data"** tab

### Step 2: Search for Trains
1. Enter **Source Station** (e.g., "Delhi" or "NDLS")
2. Enter **Destination Station** (e.g., "Mumbai" or "BCT")
3. Select a **Date**
4. Click **"Search External API"**

### Step 3: Import Trains
1. View the list of trains fetched from the external API
2. Click **"Import to Database"** on any train card
3. The train will be added to your local database
4. Users can now search and book these trains!

## 📋 Station Codes Reference

### Major Cities and Their Codes

| City | Station Code |
|------|--------------|
| Delhi / New Delhi | NDLS |
| Mumbai / Mumbai Central | BCT |
| Bangalore / Bengaluru | SBC |
| Chennai | MAS |
| Kolkata / Howrah | HWH |
| Hyderabad | HYB |
| Pune | PUNE |
| Ahmedabad | ADI |
| Jaipur | JP |
| Lucknow | LKO |
| Kanpur | CNB |
| Nagpur | NGP |
| Indore | INDB |
| Bhopal | BPL |
| Patna | PNBE |
| Vadodara | BRC |
| Agra | AGC |
| Varanasi | BSB |
| Surat | ST |
| Rajkot | RJT |
| Jodhpur | JU |
| Guwahati | GHY |
| Chandigarh | CDG |
| Coimbatore | CBE |
| Kochi | ERS |
| Thiruvananthapuram | TVC |
| Visakhapatnam | VSKP |
| Bhubaneswar | BBS |
| Ranchi | RNC |
| Gwalior | GWL |
| Amritsar | ASR |

**Note:** You can use either the city name or station code when searching.

## 🔧 API Functions Available

### 1. Search Trains Between Stations
```javascript
externalTrainAPI.searchTrains(fromStation, toStation, date)
```
**Example:**
```javascript
const trains = await externalTrainAPI.searchTrains('NDLS', 'BCT', '2024-03-15');
```

### 2. Get Train Schedule
```javascript
externalTrainAPI.getTrainSchedule(trainNumber)
```
**Example:**
```javascript
const schedule = await externalTrainAPI.getTrainSchedule('12951');
```

### 3. Get PNR Status
```javascript
externalTrainAPI.getPNRStatus(pnrNumber)
```
**Example:**
```javascript
const status = await externalTrainAPI.getPNRStatus('1234567890');
```

### 4. Search Station
```javascript
externalTrainAPI.searchStation(stationName)
```
**Example:**
```javascript
const stations = await externalTrainAPI.searchStation('Delhi');
```

## 🎯 Use Cases

### 1. **Populate Database with Real Trains**
- Use the Import Data tab in Admin Dashboard
- Search for trains on popular routes
- Import them to your database
- Users can now book real trains!

### 2. **Live Train Tracking** (Future Enhancement)
- Use `getTrainSchedule()` to show live train status
- Display real-time delays and platform information

### 3. **PNR Status Check** (Future Enhancement)
- Allow users to check their PNR status
- Show seat confirmation status

### 4. **Station Search** (Future Enhancement)
- Help users find station codes
- Auto-complete station names

## 📊 Data Mapping

When importing trains from external API, the data is mapped as follows:

| External API Field | Your Database Field |
|-------------------|---------------------|
| train_number | trainNumber |
| train_name | trainName |
| from_time | departureTime |
| to_time | arrivalTime |
| class | trainClass |
| fare | farePerSeat |

**Train Class Mapping:**
- `SL` → `SLEEPER`
- `3A` → `AC_3_TIER`
- `2A` → `AC_2_TIER`
- `1A` → `AC_1_TIER`
- `FC` → `FIRST_CLASS`

## 🔒 Security Note

The API key is currently hardcoded in the frontend. For production:

1. **Move to Environment Variables:**
```javascript
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
```

2. **Create `.env` file:**
```
VITE_RAPIDAPI_KEY=af04b150dcmsh5a8af8c069a6058p1ac05djsn0abac66796bb
VITE_RAPIDAPI_HOST=irctc1.p.rapidapi.com
```

3. **Add `.env` to `.gitignore`**

## 🚀 Quick Start Example

### Import Trains from Delhi to Mumbai

1. Go to Admin Dashboard → Import Data
2. Enter:
   - From: `Delhi` or `NDLS`
   - To: `Mumbai` or `BCT`
   - Date: Select today or future date
3. Click "Search External API"
4. Click "Import to Database" on desired trains
5. Done! Users can now search and book these trains

## 📝 Example API Response

```json
{
  "data": [
    {
      "train_number": "12951",
      "train_name": "Mumbai Rajdhani",
      "from_time": "16:55",
      "to_time": "08:35",
      "duration": "15h 40m",
      "class": "3A",
      "fare": "2500"
    }
  ]
}
```

## 🎨 UI Features

The Import Data tab includes:
- ✅ **Glassmorphism Design** - Premium frosted glass effect
- ✅ **Real-time Search** - Fetch live train data
- ✅ **Train Cards** - Beautiful cards with hover effects
- ✅ **Station Code Reference** - Quick reference guide
- ✅ **One-Click Import** - Easy database import
- ✅ **Error Handling** - Clear error messages
- ✅ **Success Feedback** - Confirmation messages

## 🔄 Workflow

```
User Input (Source, Destination, Date)
         ↓
External API Call (RapidAPI)
         ↓
Display Train Results
         ↓
User Clicks "Import"
         ↓
Convert to Local Format
         ↓
Save to Database (Spring Boot API)
         ↓
Success! Train Available for Booking
```

## 💡 Pro Tips

1. **Use Station Codes** for faster, more accurate results
2. **Import Popular Routes** first (Delhi-Mumbai, Delhi-Bangalore, etc.)
3. **Check Date Format** - API expects YYYY-MM-DD
4. **Monitor API Limits** - RapidAPI has rate limits
5. **Verify Data** before importing to ensure accuracy

## 🆘 Troubleshooting

### Issue: "Failed to fetch trains"
**Solution:** Check your internet connection and API key validity

### Issue: "No trains found"
**Solution:** Try different station codes or dates

### Issue: "Import failed"
**Solution:** Ensure you're logged in as ADMIN

### Issue: "Invalid station code"
**Solution:** Use the station code reference table

## 📞 Support

For API-related issues:
- Visit: https://rapidapi.com/irctc1-irctc1-default/api/irctc1
- Check API documentation
- Monitor your API usage quota

---

**Happy Train Importing! 🚂✨**
