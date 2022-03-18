import * as React from "react";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { CovidContext } from "../../../contexts/CovidContext";
//
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const countryList = [
  "Albania",
  "Algeria",
  "Andorra",
  "Afghanistan",
  "Argentina",
  "Armenia",
  "Angola",
  "Antigua and Barbuda",
  "Australia (Australian Capital Territory)",
  "Australia (New South Wales)",
  "Australia (Northern Territory)",
  "Australia (Queensland)",
  "Australia (South Australia)",
  "Australia (Tasmania)",
  "Australia (Victoria)",
  "Australia (Western Australia)",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burma",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada (Alberta)",
  "Canada (British Columbia)",
  "Canada (Diamond Princess)",
  "Canada (Grand Princess)",
  "Canada (Manitoba)",
  "Canada (New Brunswick)",
  "Canada (Newfoundland and Labrador)",
  "Canada (Northwest Territories)",
  "Canada (Nova Scotia)",
  "Canada (Nunavut)",
  "Canada (Ontario)",
  "Canada (Prince Edward Island)",
  "Canada (Quebec)",
  "Canada (Repatriated Travellers)",
  "Canada (Saskatchewan)",
  "Canada (Yukon)",
  "Central African Republic",
  "Chad",
  "Chile",
  "China (Anhui)",
  "China (Beijing)",
  "China (Chongqing)",
  "China (Fujian)",
  "China (Gansu)",
  "China (Guangdong)",
  "China (Guangxi)",
  "China (Guizhou)",
  "China (Hainan)",
  "China (Hebei)",
  "China (Heilongjiang)",
  "China (Henan)",
  "China (Hong Kong)",
  "China (Hubei)",
  "China (Hunan)",
  "China (Inner Mongolia)",
  "China (Jiangsu)",
  "China (Jiangxi)",
  "China (Jilin)",
  "China (Liaoning)",
  "China (Macau)",
  "China (Ningxia)",
  "China (Qinghai)",
  "China (Shaanxi)",
  "China (Shandong)",
  "China (Shanghai)",
  "China (Shanxi)",
  "China (Sichuan)",
  "China (Tianjin)",
  "China (Tibet)",
  "China (Unknown)",
  "China (Xinjiang)",
  "China (Yunnan)",
  "China (Zhejiang)",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark (Faroe Islands)",
  "Denmark (Greenland)",
  "Denmark",
  "Diamond Princess",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France (French Guiana)",
  "France (French Polynesia)",
  "France (Guadeloupe)",
  "France (Martinique)",
  "France (Mayotte)",
  "France (New Caledonia)",
  "France (Reunion)",
  "France (Saint Barthelemy)",
  "France (Saint Pierre and Miquelon)",
  "France (St Martin)",
  "France (Wallis and Futuna)",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "MS Zaandam",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands (Aruba)",
  "Netherlands (Bonaire, Sint Eustatius and Saba)",
  "Netherlands (Curacao)",
  "Netherlands (Sint Maarten)",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan*",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "US",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom (Anguilla)",
  "United Kingdom (Bermuda)",
  "United Kingdom (British Virgin Islands)",
  "United Kingdom (Cayman Islands)",
  "United Kingdom (Channel Islands)",
  "United Kingdom (Falkland Islands (Malvinas))",
  "United Kingdom (Gibraltar)",
  "United Kingdom (Isle of Man)",
  "United Kingdom (Montserrat)",
  "United Kingdom (Saint Helena, Ascension and Tristan da Cunha)",
  "United Kingdom (Turks and Caicos Islands)",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "West Bank and Gaza",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
//

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const [countryName, setCountryName] = React.useState([]);

  const { setCountries } = React.useContext(CovidContext);

  const handleChangeB = (event) => {
    setCountryName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogCloseOk = (event, reason) => {
    if (reason !== "backdropClick") {
      setCountries(countryName);
      console.log(countryName);
      setOpen(false);
    }
  };

  const handleDialogCloseCancel = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined" color="primary">
        Select Nation(s)
      </Button>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleDialogCloseCancel}
      >
        <DialogTitle>
          <Typography variant="h6">
            Select the nation(s) list whose cases you want to view
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, width: 500 }}>
                <InputLabel id="demo-multiple-chip-label"></InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={countryName}
                  onChange={handleChangeB}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Country(s)"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} sx={{ m: "2px" }} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {countryList.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, countryName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogCloseCancel}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogCloseOk}
            variant="outlined"
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
