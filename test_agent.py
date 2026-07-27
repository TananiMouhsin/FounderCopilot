from agent.planner import Planner

planner = Planner()

questions = [

    "Comment créer une SARL au Maroc ?",

    "Qui est le ministre des finances du Maroc ?",

    "Quel est le SMIG actuel au Maroc ?",

    "Comment obtenir un certificat négatif ?"

]

for q in questions:

    print("=" * 80)

    print(q)

    print("↓")

    print(planner.invoke(q))