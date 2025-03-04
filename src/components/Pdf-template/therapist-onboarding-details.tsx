/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image, Link } from '@react-pdf/renderer';
import { customFileUrlSigner } from '@/actions';
import btnLogo from '@/assets/images/btn-logo.png';
import { getImageUrlOfS3 } from '@/utils';

// Create styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    header1: {
        marginBottom: 20,
        padding: 10,
        borderBottom: 1,
        borderColor: '#333333',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    header: {
        marginBottom: 20,
        padding: 10,
        borderBottom: 1,
        borderColor: '#333333',
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        color: '#333333'
    },
    section: {
        margin: 10,
        padding: 10
    },
    subsection: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5
    },
    label: {
        width: 150,
        fontWeight: 'bold',
        color: '#555555',
        fontSize: 10
    },
    value: {
        flex: 1,
        color: '#333333',
        fontSize: 10
    },
    logo: {
        width: '100%',
        height: 'auto',
    },
    signatureLogo: {
        width: 200,
        height: 50
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#666666',
        borderTop: 1,
        borderColor: '#333333',
        paddingTop: 10,
        fontSize: 10
    }
});

// Updated helper to render attachments as a clickable link showing only the filename
const renderAttachment = (fieldValue: string) => {
    if (!fieldValue) return 'Not Attached';
    const url = getImageUrlOfS3(fieldValue);
    const parts = fieldValue.split('/');
    const filename = parts[parts.length - 1];
    return (
        <Link break src={url} style={{ color: 'blue', textDecoration: 'underline' }}>
            {filename}
        </Link>
    );
};

// PDF Document Component for Therapist Onboarding Details
const TherapistOnboardingDetails = ({ formData }: any) => {

    const formatDate = (date: any) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const consentSignature = getImageUrlOfS3(formData.consentSignature);
    const againConsentSignature = getImageUrlOfS3(formData.againConsentSignature);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header1}>
                    <Image style={styles.logo} src={btnLogo.src} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>Therapist Onboarding Details</Text>
                    <Text>Onboarding Date: {formatDate(new Date())}</Text>
                </View>

                {/* Personal Information */}
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Personal Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Full Name:</Text>
                        <Text style={styles.value}>{`${formData.firstName || ''} ${formData.lastName || ''}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{formData.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone Number:</Text>
                        <Text style={styles.value}>{formData.phoneNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Gender / DOB:</Text>
                        <Text style={styles.value}>{`${formData.gender} / ${formatDate(formData.dob)}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Licence Type:</Text>
                        <Text style={styles.value}>{formData.licenceType}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.value}>{`${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.zipCode}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>How long at address:</Text>
                        <Text style={styles.value}>{formData.howLongAtPresentAddress}</Text>
                    </View>
                </View>

                {/* Employment and Compensation Information */}
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Employment & Compensation</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Employment Status:</Text>
                        <Text style={styles.value}>{formData.currentEmploymentStatus}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Employer Name:</Text>
                        <Text style={styles.value}>{formData.currentOrPreviousEmployerName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Employer City/State:</Text>
                        <Text style={styles.value}>{formData.employmentCityState}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Role/Position:</Text>
                        <Text style={styles.value}>{formData.rolePosition}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Rate of Pay:</Text>
                        <Text style={styles.value}>{formData.rateOfPay}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Salary Desired:</Text>
                        <Text style={styles.value}>{formData.salaryDesired}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Start / End Dates:</Text>
                        <Text style={styles.value}>{`${formatDate(formData.startDate)} / ${formatDate(formData.endDate)}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Reason For Leaving:</Text>
                        <Text style={styles.value}>{formData.reasonForLeaving}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Supervisor Name:</Text>
                        <Text style={styles.value}>{formData.supervisorName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Job Description:</Text>
                        <Text style={styles.value}>{formData.jobDescription}</Text>
                    </View>
                </View>

                {/* Educational & Certification */}
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Education & Certification</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Highest Education:</Text>
                        <Text style={styles.value}>{formData.highestEducationCompleted}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>School Name:</Text>
                        <Text style={styles.value}>{formData.schoolName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Location:</Text>
                        <Text style={styles.value}>{formData.location}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Major/Degree:</Text>
                        <Text style={styles.value}>{formData.majorDegree}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>License/Certification:</Text>
                        <Text style={styles.value}>{formData.licenseOrCertification}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Skills:</Text>
                        <Text style={styles.value}>{formData.skills}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Weekly Hours:</Text>
                        <Text style={styles.value}>{formData.weeklyHours}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Employment Desired:</Text>
                        <Text style={styles.value}>{formData.employmentDesired}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Start/End Time:</Text>
                        <Text style={styles.value}>{`${formData.startTime} / ${formData.endTime}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Availability:</Text>
                        <Text style={styles.value}>{(formData.currentAvailability || []).join(', ')}</Text>
                    </View>
                </View>

                {/* Legal / Background Information */}
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Legal / Background</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Felony/Misdemeanor:</Text>
                        <Text style={styles.value}>{formData.felonyOrMisdemeanor}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>If Applicable:</Text>
                        <Text style={styles.value}>{formData.ifFelonyOrMisdemeanor}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Lived in NC:</Text>
                        <Text style={styles.value}>{formData.livedInNorthCarolina ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>If Not, Why:</Text>
                        <Text style={styles.value}>{formData.ifNotLivedInNorthCarolina}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Valid Driver License:</Text>
                        <Text style={styles.value}>{formData.validDriverLicense ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Reliable Transportation:</Text>
                        <Text style={styles.value}>{formData.reliableTransportation ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Legal Right to Work:</Text>
                        <Text style={styles.value}>{formData.legalRightToWorkInUS ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Reasonable Accommodation:</Text>
                        <Text style={styles.value}>{formData.reasonableAccommodation ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Driver License/State ID:</Text>
                        <Text style={styles.value}>{formData.driverLicenseOrStateId}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>State of Issue:</Text>
                        <Text style={styles.value}>{formData.stateOfIssue}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Expiration Date:</Text>
                        <Text style={styles.value}>{formatDate(formData.expirationDate)}</Text>
                    </View>
                </View>

                {/* Professional References */}
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Professional References</Text>
                    {(formData.professionalReferences || []).map((ref: any, idx: number) => (
                        <View key={idx} style={styles.subsection}>
                            <Text style={{ fontSize: 12, marginBottom: 5 }}>Reference {idx + 1}:</Text>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name:</Text>
                                <Text style={styles.value}>{ref.name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Phone:</Text>
                                <Text style={styles.value}>{ref.phone}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.value}>{ref.email}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Company Position:</Text>
                                <Text style={styles.value}>{ref.companyPosition}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Additional Information */}
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Additional Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Qualified For Position:</Text>
                        <Text style={styles.value}>{formData.howAreQualifiedForPosition}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Additional Details:</Text>
                        <Text style={styles.value}>{formData.additionalInformation}</Text>
                    </View>
                </View>

                {/* Attachments */}
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Attachments</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Consent Signature:</Text>
                        <View style={styles.value}>
                            <Image style={styles.signatureLogo} src={consentSignature} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Current Resume:</Text>
                        <Text style={styles.value}>{renderAttachment(formData.currentResume)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Supervision Agreement:</Text>
                        <Text style={styles.value}>{renderAttachment(formData.superVisionAgreement)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Again Consent Signature:</Text>
                        <View style={styles.value}>
                            <Image style={styles.signatureLogo} src={againConsentSignature} />
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text>This is an automatically generated document for therapist onboarding purposes.</Text>
                </View>
            </Page>
        </Document>
    );
};

export const uploadTherapistOnboardingDetails = async (formData: any, userEmail: string) => {
    try {
        const onboardingDoc = <TherapistOnboardingDetails formData={formData} />;
        const pdfBlob = await pdf(onboardingDoc).toBlob();
        const fileName = `therapists/${userEmail}/onboarding/onboarding-details-${new Date().getTime()}.pdf`;

        const { signedUrl, key } = await customFileUrlSigner(fileName);

        await fetch(signedUrl, {
            method: 'PUT',
            body: pdfBlob,
            headers: {
                'Content-Type': 'application/pdf'
            }
        });
        return { key, signedUrl };
    } catch (error) {
        console.error('Error generating and uploading PDF:', error);
        throw error;
    }
};

export default TherapistOnboardingDetails;