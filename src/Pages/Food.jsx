import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Search2Icon,
  CheckCircleIcon,
  AddIcon,
  MinusIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import Food_img2 from "../Images/Food_img4.jpg";
import Food_data from "../Json_data/Food_data.json";
import CircleChart from "../Components/CircleChart";

import "../styles/food.css"; // Import the CSS file

const Food = () => {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState("");
  const [data2, setData2] = useState();
  const [foodList, setFoodList] = useState([]);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const { Apple, soup, banana, egg, chicken, idly, vada, dosa, muttonbiryani, chickenbiryani, fishcurry } = Food_data;

  const handleChange = (e) => {
    setData(e.target.value);
    setFlag(true);
  };

  const handleClick = () => {
    if (data === "egg") {
      setData2(egg);
    }
    if (data === "soup") {
      setData2(soup);
    }
    if (data === "apple") {
      setData2(Apple);
    }
    if (data === "banana") {
      setData2(banana);
    }
    if (data === "chicken") {
      setData2(chicken);
    }
    if (data === "idly") {
      setData2(idly);
    }
    if (data === "dosa") {
      setData2(dosa);
    }
    if (data === "vada") {
      setData2(vada);
    }
    if (data === "chickenbiryani") {
      setData2(chickenbiryani);
    }
    if (data === "muttonbiryani") {
      setData2(muttonbiryani);
    }
    if (data === "fishcurry") {
      setData2(fishcurry);
    }
  };

  const handleAddFood = (food) => {
    const existingFood = foodList.find((item) => item.name === food.name);

    if (existingFood) {
      const updatedFoodList = foodList.map((item) =>
        item.name === food.name ? { ...item, count: item.count + 1 } : item
      );
      setFoodList(updatedFoodList);
    } else {
      const newFood = { ...food, count: 1 };
      setFoodList([...foodList, newFood]);
    }

    // Calculate the sum of protein and calories
    setTotalProtein((prevProtein) => prevProtein + food.Protein);
    setTotalCalories((prevCalories) => prevCalories + food.Calories);
  };

  const handleRemoveFood = (food) => {
    const existingFood = foodList.find((item) => item.name === food.name);

    if (existingFood) {
      if (existingFood.count > 1) {
        const updatedFoodList = foodList.map((item) =>
          item.name === food.name ? { ...item, count: item.count - 1 } : item
        );
        setFoodList(updatedFoodList);
      } else {
        const updatedFoodList = foodList.filter((item) => item.name !== food.name);
        setFoodList(updatedFoodList);
      }

      // Calculate the new sum of protein and calories
      setTotalProtein((prevProtein) => prevProtein - food.Protein);
      setTotalCalories((prevCalories) => prevCalories - food.Calories);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box w="50%" ml="26%" align="center">
        <Flex mt={10} align="center">
          <Input type="text" placeholder="Search for Food" onChange={handleChange} />
          <Button onClick={handleClick}>
            <Search2Icon color="black" />
          </Button>
        </Flex>
      </Box>
      {flag === false ? (
        <Image w="40%" ml="30%" src={Food_img2} align="center"/>
      ) : data2 === undefined ? (
        <Stack w="50%" ml="26%" mt="50px" align="center">
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </Stack>
      ) : (
        <Stack w="60%" ml="20%" mt="50px" >
          {data2.map((elem, i) => (
            <div key={elem.name + i}>
              <Flex justifyContent="space-between" align="center">
                <Box height="auto" lineHeight="25px">
                  <Heading size="sm" color="#0066EE">
                    {elem.name} <CheckCircleIcon size="10px" color="green" />
                  </Heading>
                  <Text fontSize="sm">{elem.category}</Text>
                  <Text fontSize="sm">{`Calories: ${elem.Calories} Fat: ${elem.Fat}g Carbs: ${elem.Carbs}g Protein: ${elem.Protein}g`}</Text>
                </Box>
                <CircleChart carbs={elem.Carbs} fat={elem.Fat} protein={elem.Protein} />
                <Button onClick={() => handleAddFood(elem)}>
                  <AddIcon />
                </Button>
              </Flex>
              <hr />
            </div>
          ))}
        </Stack>
      )}

      <Box className="food-container" >
        <Stack spacing={4}>
          <Box>
            <Heading size="md" align="center" marginBottom={5} marginTop={10}>Added Food:</Heading>
            {foodList.map((food, index) => (
              <Flex
              key={index}
              justifyContent="space-between"
              align="center"
              className="added-food-item"
            >
              <Text>{food.name}</Text>
              <Flex>
                <Button
                  size="sm"
                  onClick={() => handleRemoveFood(food)}
                  isDisabled={food.count === 1}
                  marginRight={5}
                >
                  <MinusIcon />
                </Button>
                <Text>{`${food.count}`}</Text>
                <Button size="sm" onClick={() => handleAddFood(food)} marginLeft={5}>
                  <AddIcon />
                </Button>
                <Button size="sm" onClick={() => handleRemoveFood(food)} marginLeft={2}>
                  <DeleteIcon />
                </Button>
              </Flex>
              <Text fontWeight={"bold"}>{`Protein:  ${food.Protein}g`}</Text>
              <Text fontWeight={"bold"}>{`Calories:  ${food.Calories}`}</Text>
            </Flex>
            ))}
          </Box>

          <Box>
            <Heading size="md" align="center" marginBottom={5} marginTop={10}>Total:</Heading>
            <Flex justifyContent="space-between" align="center" className="total-count">
              <Text>Total Protein:</Text>
              <Text>{`${totalProtein}g`}</Text>
            </Flex>
            <Flex justifyContent="space-between" align="center" className="total-count">
              <Text>Total Calories:</Text>
              <Text>{`${totalCalories}`}</Text>
            </Flex>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Food;
