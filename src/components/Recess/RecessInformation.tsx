import React from 'react';
import { Card, CardContent, Typography, Select, MenuItem } from '@mui/material';

interface ResponseDataProps {
  responseData: any[];
}

const ResponseData: React.FC<ResponseDataProps> = ({ responseData }) => {
  const [selectedName, setSelectedName] = React.useState<string>("");
console.log(responseData)
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedName(event.target.value as string);
  };

  return (
    <Card sx={{ borderRadius: '10px', backgroundColor: 'rgba(255, 0, 0, 0.5)', padding: '20px', height: '420px', width: '620px' }}>
      <CardContent>
        <Typography variant="h5" component="h2" mt={2}>
            TOPIC
          </Typography>
        <Select value={selectedName} >
          {responseData.map((item: any, index: number) => (
            <MenuItem key={index} value={item.name} sx={{ color: 'black' }} >
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {selectedName && (
          <Typography variant="h5" component="h2" mt={2}>
            Selected Name: {selectedName}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseData;