import { render, screen, fireEvent } from "@testing-library/react";
import AuthPage from "./AuthPage";
import "@testing-library/jest-dom";

describe("AuthPage", () => {
    const onAuthSuccess = jest.fn();

    beforeEach(() => {
        onAuthSuccess.mockClear();
    });

    test("renders login form by default", () => {
        render(<AuthPage onAuthSuccess={onAuthSuccess} />);
        expect(screen.getByText("Connexion")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Adresse e-mail")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
        expect(screen.getByText("Se connecter")).toBeInTheDocument();
        expect(screen.getByText("Créer un compte")).toBeInTheDocument();
    });

    test("switches to sign up form", () => {
        render(<AuthPage onAuthSuccess={onAuthSuccess} />);
        fireEvent.click(screen.getByText("Créer un compte"));
        expect(screen.getByText("Inscription")).toBeInTheDocument();
        expect(screen.getByText("S'inscrire")).toBeInTheDocument();
        expect(screen.getByText("J'ai déjà un compte")).toBeInTheDocument();
    });

    test("calls onAuthSuccess on successful login", async () => {
        render(<AuthPage onAuthSuccess={onAuthSuccess} />);
        fireEvent.change(screen.getByPlaceholderText("Adresse e-mail"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), { target: { value: "password" } });
        fireEvent.click(screen.getByText("Se connecter"));

        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(onAuthSuccess).toHaveBeenCalled();
    });

    test("calls onAuthSuccess on successful sign up", async () => {
        render(<AuthPage onAuthSuccess={onAuthSuccess} />);
        fireEvent.click(screen.getByText("Créer un compte"));
        fireEvent.change(screen.getByPlaceholderText("Adresse e-mail"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), { target: { value: "password" } });
        fireEvent.click(screen.getByText("S'inscrire"));

        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(onAuthSuccess).toHaveBeenCalled();
    });

    test("shows error message on failed login", async () => {
        render(<AuthPage onAuthSuccess={onAuthSuccess} />);
        fireEvent.change(screen.getByPlaceholderText("Adresse e-mail"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), { target: { value: "wrongpassword" } });
        fireEvent.click(screen.getByText("Se connecter"));

        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(screen.getByText("Erreur d'authentification :")).toBeInTheDocument();
    });
});