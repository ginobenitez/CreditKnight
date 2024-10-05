import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
from faker import Faker

data = pd.read_csv('creditcard_2023.csv')
#scales data set using scaler
scaler = StandardScaler()
data['scaled_amount'] = scaler.fit_transform(data['Amount'].values.reshape(-1, 1))
data['scaled_time'] = scaler.fit_transform(data['Fraud'].values.reshape(-1, 1))
#data.drop(columns=['Amount', 'scaled_time'], inplace=True)

X = data.drop('scaled_time', axis=1)
print(X)
#contains if transaction is fraudulent or not 
y = data['scaled_time']
#smote technique creates synthetic data of the minority class data set, fixing data imbalances
smote = SMOTE()
#resamples the data using the smote technique 
X_resampled, y_resampled = smote.fit_resample(X, y)

#splits the data set into training and testing
    #20% of data used for testing 
    #random state fixes the rand seed 
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

#trains the model 
#uses the random forest model
    #splits the model into multiple trees, then combines the trees to get a more accurate prediction
model = RandomForestClassifier(random_state=42)
#sends the data to be trained by the random forest model
model.fit(X_train, y_train)

#uses the model to predict if the transactions are fraudulent 
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
print("Accuracy:", accuracy)
print("Precision:", precision)
#saves model to joblib
import joblib 
joblib.dump(model, 'credit_fraud_model.pk1')



fake = Faker()

def generate_bank_data(num_records=1000):
    data = {
        'account_id': np.random.randint(1000, 9999, num_records),
        'user_id': np.random.randint(1, 100, num_records),
        'transaction_id': np.random.randint(1000000, 9999999, num_records),
        'transaction_amount': np.round(np.random.uniform(10, 2000, num_records), 2),
        'transaction_time': [fake.date_time_this_year() for _ in range(num_records)],
        'merchant_category': np.random.choice(['groceries', 'electronics', 'clothing', 'dining'], num_records),
        'location': [fake.city() for _ in range(num_records)],
        'device_id': [fake.uuid4() for _ in range(num_records)],
        'ip_address': [fake.ipv4() for _ in range(num_records)],
        'is_fraud': np.random.choice([0, 1], p=[0.97, 0.03], size=num_records)  # 3% fraud
    }
    return pd.DataFrame(data)

# Generate the data
bank_data = generate_bank_data(1000)
bank_data.head()
