package com.nhln.MiniBlog.utils;

import com.nhln.MiniBlog.security.UserPrincipal;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "Nguyen-Hoang-Long-Nhat-!@#^!%@!^*#-miniblogweb";
    private final Long EXPIRATION_MS = 60 * 60 * 1000L;

    public String generateToke(String email) throws JOSEException {
        JWSSigner signer = new MACSigner(this.SECRET_KEY);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(email)
                .expirationTime(new Date(System.currentTimeMillis() + this.EXPIRATION_MS))
                .issueTime(new Date())
                .build();
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }

    public String extractEmail(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getSubject();
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);
        }
    }

    public boolean validateToken(String token, UserPrincipal userPrincipal) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(this.SECRET_KEY);

            if (!signedJWT.verify(verifier))
                return false;

            String email = signedJWT.getJWTClaimsSet().getSubject();
            Date expiration_ms = signedJWT.getJWTClaimsSet().getExpirationTime();
            return (email.equals(userPrincipal.getEmail()) && (expiration_ms.after(new Date())));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
