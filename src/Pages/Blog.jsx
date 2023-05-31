import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

const ProteinGoalCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [proteinGoal, setProteinGoal] = useState("");

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const calculateProteinGoal = () => {
    // Perform calculations to determine protein goal
    // Here's a simple example based on average values:
    let proteinGoal = 0;

    if (gender === "male") {
      proteinGoal = weight * 2.2;
    } else if (gender === "female") {
      proteinGoal = weight * 2.1;
    }

    setProteinGoal(proteinGoal);
  };

  return (
    <Box w="60%" ml="11%">
      <Heading mt={10} mb={4} size="md">
        Protein Goal Calculator
      </Heading>

      <Flex direction="column">
        <Box mb={4}>
          <Text>Height:</Text>
          <Input
            type="number"
            value={height}
            onChange={handleHeightChange}
            placeholder="Enter height in cm"
          />
        </Box>

        <Box mb={4}>
          <Text>Weight:</Text>
          <Input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Enter weight in kg"
          />
        </Box>

        <Box mb={4}>
          <Text>Gender:</Text>
          <Select value={gender} onChange={handleGenderChange} placeholder="Select gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </Box>

        <Box mb={4}>
          <Text>Age:</Text>
          <Input
            type="number"
            value={age}
            onChange={handleAgeChange}
            placeholder="Enter age"
          />
        </Box>

        <Button onClick={calculateProteinGoal}>Calculate Protein Goal</Button>

        {proteinGoal !== "" && (
          <Box mt={4}>
            <Text>Your protein goal for a day is: {proteinGoal} grams.</Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default ProteinGoalCalculator;
