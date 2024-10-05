import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE

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

