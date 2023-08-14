import React, { useState } from 'react';
import {
  Box,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  Progress,
} from '@chakra-ui/react';

const getPasswordStrengthColor = (strength) => {
  if (strength === 0) return 'white';
  if (strength < 33) return 'red';
  if (strength < 66) return 'yellow';
  return 'green';
};

const getPasswordStrengthLabel = (strength) => {
  if (strength < 33) return 'Weak';
  if (strength < 66) return 'Moderate';
  return 'Strong';
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    title: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password) => {
    const requirementsMet = {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/.test(password),
    };

    const requirementsCount = Object.values(requirementsMet).filter(Boolean).length;
    const strength = (requirementsCount / 4) * 100;
    return strength;
  };
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    switch (fieldName) {
      case 'firstName':
        newErrors.firstName = value.trim() === '' ? 'First Name is required' : '';
        break;
      case 'title':
        newErrors.title = value.trim() === '' ? 'title is required' : '';
        break;
      case 'email':
        newErrors.email = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format';
        break;
      case 'password':
        newErrors.password = value.length >= 8 ? '' : 'Password must be at least 8 characters long';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    const hasEmptyFields = Object.values(formData).some((fieldValue) => fieldValue.trim() === '');
    setIsButtonDisabled(Object.values(newErrors).some((error) => error !== '') || hasEmptyFields);
  };

  const handleRegister = () => {
    // Simulate registration by displaying success modal
    setIsSuccessModalOpen(true);
  };

  return (
    <Container maxW="md" mt={10}>
      <VStack spacing={4}>
      <Box
          maxW="400px"
          mx="auto"
          p={4}
          borderWidth={1}
          borderColor="gray.300"
          borderRadius="md"
          boxShadow="md"
        >
        <FormControl id="firstName" isInvalid={errors.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
          <Text color="red.500">{errors.firstName}</Text>
        </FormControl>
        <FormControl id="title" isInvalid={errors.title}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your title"
          />
          <Text color="red.500">{errors.title}</Text>
        </FormControl>
        <FormControl id="email" isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          <Text color="red.500">{errors.email}</Text>
        </FormControl>

        <FormControl id="password" isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          <Text color="red.500">{errors.password}</Text>
          <Progress value={passwordStrength} colorScheme={getPasswordStrengthColor(passwordStrength)} />
          <Text color={getPasswordStrengthColor(passwordStrength)}>
            {getPasswordStrengthLabel(passwordStrength)}
          </Text>
        </FormControl>

        <Box maxW="400px" // Adjust the width as needed
      mx="auto"
      p={10}
      borderWidth={2}
      borderColor="green.300"
      borderRadius="md"
      boxShadow="md"><p><font color='green'><ul>
          To set a Strong Password:
          <li> Enter atleast 1 Small letter</li>
          <li> Enter atleast 1 Capital letter</li>
          <li> Enter atleast 1 Number</li>
          <li> Enter atleast 1 Special Character</li>
          </ul></font>
        </p>
        </Box>
        </Box>

        <Button
          colorScheme="green"
          onClick={handleRegister}
          isDisabled={isButtonDisabled}
        >
          Register
        </Button>

        {/* Success Modal */}
        {isSuccessModalOpen && (
          <div>
            Registration Successful! <button onClick={() => setIsSuccessModalOpen(false)}>Close</button>
          </div>
        )}
      </VStack>
    </Container>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <RegistrationForm />
    </ChakraProvider>
  );
};

export default App;
