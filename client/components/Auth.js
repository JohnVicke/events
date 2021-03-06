import {
  useColorMode,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const AuthContent = ({ register, errors, type, ...rest }) => (
  <Stack {...rest}>
    {type === "Register" ? (
      <>
        <FormControl isInvalid={errors.email && errors.email.message}>
          <FormLabel>Email address</FormLabel>
          <Input
            autoFocus
            name="email"
            colorScheme="teal"
            ref={register({
              required: "Email required",
            })}
            placeholder="name@site.com"
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.username && errors.username.message}>
          <FormLabel>Username</FormLabel>
          <Input
            autoFocus
            name="username"
            colorScheme="teal"
            ref={register({
              required: "Username required",
            })}
            placeholder="username"
          />
          <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
        </FormControl>
      </>
    ) : (
      <FormControl isInvalid={errors.usernameOrEmail && errors.usernameOrEmail.message}>
        <FormLabel>Username or email</FormLabel>
        <Input
          autoFocus
          name="usernameOrEmail"
          colorScheme="teal"
          ref={register({
            required: "Email or username is required",
          })}
          placeholder="username / name@site.com"
        />
        <FormErrorMessage>{errors.usernameOrEmail && errors.usernameOrEmail.message}</FormErrorMessage>
      </FormControl>
    )}
    <FormControl isInvalid={errors.password && errors.password.message}>
      <FormLabel>Password</FormLabel>
      <Input
        name="password"
        type="password"
        ref={register({
          required: "Please enter a password",
        })}
        placeholder="********"
      />
      <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>
    <Button type="submit" mt={4} variant="solid" colorScheme="teal">
      {type}
    </Button>
  </Stack>
);

/**
 * Implement fullscreen auth and modal auth.
 * Fullscreen auth should be used in
 *      pages/login
 *      pages/register
 */

const FullScreenAuth = ({ type, onSubmit }) => {
  const { handleSubmit, register, errors } = useForm();
  const { colorMode } = useColorMode();

  return (
    <Flex align="center" justifyContent="center" h="100vh">
      <AuthContent
        backgroundColor={colorMode === "light" ? "gray.100" : "gray.900"}
        as="form"
        borderRadius={8}
        errors={errors}
        register={register}
        onSubmit={handleSubmit((data) => onSubmit(data))}
        px={8}
        py={12}
        shadow={[null, "md"]}
        spacing={3}
        type={type}
        w="100%"
        maxWidth="400px"
      />
    </Flex>
  );
};

const AuthModal = ({ isOpen, onClose, type, onSubmit }) => {
  const { handleSubmit, register, errors } = useForm();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="400px">
      <ModalOverlay />
      <ModalContent borderRadius={4}>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" justify="center">
            <AuthContent
              as="form"
              errors={errors}
              onSubmit={handleSubmit((data) => onSubmit(data))}
              px={8}
              py={12}
              register={register}
              spacing={3}
              type={type}
              w="100%"
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const withAuthModal = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const toast = useToast();
};

export default FullScreenAuth;
