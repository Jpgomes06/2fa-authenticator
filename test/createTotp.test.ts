import { CreateTotpService } from "../src/services/totpAccountCreator";

describe("CreateTotpService", () => {
    const uuid = { generate: jest.fn() };
    const secret = { generate: jest.fn() };
    const qr = { generate: jest.fn() };
    const repo = { execute: jest.fn() };


    const service =  new CreateTotpService(uuid, secret, qr, repo);


    it("should return success when creating a TOTP account.", async () => {
        uuid.generate.mockReturnValue("uuidfake");
        secret.generate.mockReturnValue("secretfake1");
        qr.generate.mockResolvedValue("qr_base64");
        repo.execute.mockResolvedValue(true);

        const result = await service.execute("label", "issuer", "userID");

        expect(result.label).toBe("label");
        expect(result.issuer).toBe("issuer");
        expect(result.userID).toBe("userID");
        expect(result.accountID).toBe("uuidfake");
        expect(result.secret).toBe("secretfake1");
        expect(result.createdAt).toBeTruthy();
        expect(result.otpAuthUri).toBe("otpauth://totp/issuer:label?secret=secretfake1&issuer=issuer");
        expect(result.qrCodeBase64).toBe("qr_base64");
    });

    it("should return error when creating a TOTP account.", async () => {
        uuid.generate.mockReturnValue("uuidfake");
        secret.generate.mockReturnValue("secretfake1");
        qr.generate.mockResolvedValue("qr_base64");
        repo.execute.mockResolvedValue(false);
        await expect(
            service.execute("Industria LTDA", "facebook", "userIDfake")
        ).rejects.toThrow("Error sending to queue!");
    });
});
