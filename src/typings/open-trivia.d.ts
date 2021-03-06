declare namespace OpenTrivia {
    interface RequestParams {
        amount: number;
        category: number;
    }

    interface Response {
        response_code: number;
        results: Question[];
    }

    interface Question {
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
    }
}
