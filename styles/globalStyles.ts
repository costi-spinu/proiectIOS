import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
    },

    card: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },

    title: {
        ...typography.title,
        marginBottom: spacing.lg,
        color: colors.textPrimary,
    },

    sectionTitle: {
        ...typography.sectionTitle,
        marginBottom: spacing.md,
    },

    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        padding: spacing.md,
        marginBottom: spacing.md,
    },

    buttonPrimary: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: 14,
        alignItems: "center",
    },

    buttonText: {
        color: colors.white,
        fontWeight: "600",
    },

    heroCardPrimary: {
        backgroundColor: colors.primary,
        padding: spacing.lg,
        borderRadius: 20,
        marginBottom: spacing.lg,
    },

    heroTextWhite: {
        color: colors.white,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    textSecondary: {
        color: colors.textSecondary,
    },
});
