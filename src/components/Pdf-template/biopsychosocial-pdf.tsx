/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import { customFileUrlSigner } from '@/actions';
import btnLogo from '@/assets/images/btn-logo.png';
import pdfTopRIghtAsset from '@/assets/images/pdf-right.png';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
        position: "relative"
    },
    headerContainer: {
        marginBottom: 30,
    },
    topRightDesign: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 150,
        height: 100,
    },
    logo: {
        width: 300,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: '#1F2937'
    },
    documentDate: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 10,
        borderBottom: '2px solid #E5E7EB',
        paddingBottom: 10
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 15
    },
    infoGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingBottom: 4,
        borderBottom: '1px solid #E5E7EB',
        alignItems: 'center',
    },
    label: {
        width: 120,
        fontSize: 12,
        color: '#4B5563',
        fontWeight: 'bold',
        marginRight: 20,
    },
    value: {
        flex: 1,
        fontSize: 12,
        color: '#1F2937',
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #E5E7EB',
        paddingBottom: 4,
        marginBottom: 4,
    },
    tableHeader: {
        width: '50%',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#4B5563',
        marginRight: 20,
    },
    tableCell: {
        width: '50%',
        fontSize: 12,
        color: '#1F2937',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#6B7280',
        fontSize: 10,
        borderTop: '1px solid #E5E7EB',
        paddingTop: 10
    },
});

const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// PDF Document Component for Biopsychosocial Assessment
const BiopsychosocialAssessmentPdf = ({ formData }: any) => {
    const therapistSignatures = formData.signature || '';
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.topRightDesign} src={pdfTopRIghtAsset.src} />
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Image style={styles.logo} src={btnLogo.src} />
                    <Text style={styles.title}>Biopsychosocial Assessment</Text>
                    <Text style={styles.documentDate}>
                        Assessment Date: {formatDate(formData.assessmentDate || new Date())}
                    </Text>
                </View>

                {/* Client Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Client Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Client Name:</Text>
                            <Text style={styles.value}>{formData.clientName || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Clinician Name:</Text>
                            <Text style={styles.value}>{formData.clinicianName || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Individuals Present:</Text>
                            <Text style={styles.value}>{formData.individualsPresent || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Introductions:</Text>
                            <Text style={styles.value}>{formData.introductions || 'No'}</Text>
                        </View>
                    </View>
                </View>

                {/* Safety Assessment */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Safety Assessment</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>In the past few weeks, have you wished you were dead?</Text>
                            <Text style={styles.tableCell}>{formData.wishDead || 'No'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>In the past few weeks, have you felt that you or your family would be better off if you were dead?</Text>
                            <Text style={styles.tableCell}>{formData.familyBetterOff || 'No'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>In the past week, have you been having thoughts about killing yourself?</Text>
                            <Text style={styles.tableCell}>{formData.suicidalThoughts || 'No'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Have you ever tried to kill yourself?</Text>
                            <Text style={styles.tableCell}>{formData.suicideAttempt || 'No'}</Text>
                        </View>
                        {formData.suicideAttempt === 'Yes' && (
                            <>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableHeader}>If yes, how?</Text>
                                    <Text style={styles.tableCell}>{formData.suicideAttemptDetails || 'No'}</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableHeader}>When?</Text>
                                    <Text style={styles.tableCell}>{formData.suicideAttemptWhen || 'No'}</Text>
                                </View>
                            </>
                        )}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Are you having thoughts of killing yourself right now?</Text>
                            <Text style={styles.tableCell}>{formData.currentSuicidalThoughts || 'No'}</Text>
                        </View>
                        {formData.currentSuicidalThoughts === 'Yes' && (
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeader}>If yes, please describe:</Text>
                                <Text style={styles.tableCell}>{formData.currentSuicidalThoughtsDetails || 'No'}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Biological Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Biological</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>What got us here to this moment?</Text>
                            <Text style={styles.value}>{formData.presentingProblem || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Current Concerns:</Text>
                            <Text style={styles.value}>{formData.currentConcerns || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Signs and Symptoms:</Text>
                            <Text style={styles.value}>{formData.signsSymptoms || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Treatment History:</Text>
                            <Text style={styles.value}>{formData.treatmentHistory || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Counseling History & Diagnoses:</Text>
                            <Text style={styles.value}>{formData.counselingHistory || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Mental Health History:</Text>
                            <Text style={styles.value}>{formData.mentalHealthHistory || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>History of Trauma and Abuse:</Text>
                            <Text style={styles.value}>{formData.traumaHistory || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Treatment Goals:</Text>
                            <Text style={styles.value}>{formData.treatmentGoals || 'No'}</Text>
                        </View>
                    </View>
                </View>

                {/* Psychosocial Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Psychosocial</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Current Living Condition:</Text>
                            <Text style={styles.value}>{formData.livingCondition || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Family & Significant Relationships:</Text>
                            <Text style={styles.value}>{formData.familyRelationships || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Family Mental Health History:</Text>
                            <Text style={styles.value}>{formData.familyMentalHealth || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Criminal/Legal Issues:</Text>
                            <Text style={styles.value}>{formData.legalIssues || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Leisure/Recreation:</Text>
                            <Text style={styles.value}>{formData.leisure || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>School:</Text>
                            <Text style={styles.value}>{formData.school || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Problems at School:</Text>
                            <Text style={styles.value}>{formData.schoolProblems || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Support at School:</Text>
                            <Text style={styles.value}>{formData.schoolSupport || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Part-Time Job:</Text>
                            <Text style={styles.value}>{formData.partTimeJob || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Substance Use:</Text>
                            <Text style={styles.value}>{formData.substanceUse || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Support Systems:</Text>
                            <Text style={styles.value}>{formData.supportSystems || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Ongoing Stressors/Challenges:</Text>
                            <Text style={styles.value}>{formData.ongoingStressors || 'No'}</Text>
                        </View>
                    </View>
                </View>

                {/* Medical History Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Medical History</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Medical Condition:</Text>
                            <Text style={styles.value}>{formData.medicalCondition || 'No'}</Text>
                        </View>
                        {formData.medicalCondition === 'Yes' && (
                            <View style={styles.row}>
                                <Text style={styles.label}>Medical Condition Details:</Text>
                                <Text style={styles.value}>{formData.medicalConditionDetails || 'No'}</Text>
                            </View>
                        )}
                        <View style={styles.row}>
                            <Text style={styles.label}>Medications:</Text>
                            <Text style={styles.value}>{formData.medications || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Sleep:</Text>
                            <Text style={styles.value}>{formData.sleep || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Movement:</Text>
                            <Text style={styles.value}>{formData.movement || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Substance Use History:</Text>
                            <Text style={styles.value}>{formData.substanceUseHistory || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Cultural/Ethnic Information:</Text>
                            <Text style={styles.value}>{formData.culturalInfo || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Orientation & Gender Identity:</Text>
                            <Text style={styles.value}>{formData.orientationGender || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Employment/School Information:</Text>
                            <Text style={styles.value}>{formData.employmentInfo || 'No'}</Text>
                        </View>
                    </View>
                </View>

                {/* Strengths Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Strengths</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Coping Strategies:</Text>
                            <Text style={styles.value}>{formData.copingStrategies || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Support Network:</Text>
                            <Text style={styles.value}>{formData.supportNetwork || 'No'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Personal Strengths:</Text>
                            <Text style={styles.value}>{formData.personalStrengths || 'No'}</Text>
                        </View>
                    </View>
                </View>

                {/* Therapist Signature */}
                <View style={{ ...styles.section, marginTop: 100 }}>
                    <Text style={styles.sectionTitle}>Therapist Signature</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Therapist Name:</Text>
                            <Text style={styles.value}>{formData.clinicianName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Signature:</Text>
                            <Image style={{ width: 250, height: 60 }} src={therapistSignatures} />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Date:</Text>
                            <Text style={styles.value}>{formatDate(new Date())}</Text>
                        </View>
                    </View>
                </View>
                {/* Footer */}
                <View style={styles.footer}>
                    <Text>
                        Generated by Black Therapy Network - Normalizing Therapy in the Black Community
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export const uploadBiopsychosocialAssessment = async (formData: any) => {
    try {
        const assessmentDoc = <BiopsychosocialAssessmentPdf formData={formData} />;
        const pdfBlob = await pdf(assessmentDoc).toBlob();
        const fileName = `appointments/${formData.clientId.email}/my-appointment-files/biopsychosocial-assessment-${new Date().getTime()}.pdf`;
        const { signedUrl, key } = await customFileUrlSigner(fileName);
        const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: pdfBlob,
            headers: {
                'Content-Type': 'application/pdf'
            }
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload Biopsychosocial Assessment');
        }

        return { uploadedKey: key, signedUrl };
    } catch (error) {
        console.error('Error generating and uploading Biopsychosocial Assessment PDF:', error);
        throw error;
    }
}

export default BiopsychosocialAssessmentPdf;